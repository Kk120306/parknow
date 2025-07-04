import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";



const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please log in to view your reservations."
            />
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="You have no reservations on your account."
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationPage;