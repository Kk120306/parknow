import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import SpotsClient from "./SpotsClient";

const SpotPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please log in to view your reservations."
            />
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="You have no reservations on your account."
            />
        );
    }

    return (
        <SpotsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default SpotPage;