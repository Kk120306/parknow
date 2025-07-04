import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState
                title="Listing not found"
                subtitle="The listing you are trying to access does not exist."
            />
        )

    }

    return (
        <div>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
                reservation={reservations}
            />
        </div>
    );
}

export default ListingPage;