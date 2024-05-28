import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

    const [error, setError] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user, sweetAlert } = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post("/create-payment-intent", {
                price: totalPrice
            })
                .then(res => {
                    // console.log(res.data);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            setError(error.message);
            console.log("Payment error", error);
        }
        else {
            setError("");
            console.log("Payment method", paymentMethod);
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm error", confirmError);
        }
        else {
            if (paymentIntent.status === "succeeded") {
                console.log("Payment Intent", paymentIntent);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: "pending"
                }

                const res = await axiosSecure.post("/payments", payment)
                console.log("payments save", res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    sweetAlert("Payment Success");
                    navigate("/dashboard/paymentHistory");
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary mt-4" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <h3 className="text-red-600 mt-2">{error}</h3>
            {transactionId && <h3 className="text-green-600">Your transaction id = {transactionId}</h3>}
        </form>
    );
};

export default CheckoutForm;