import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const FavoritePage = async () => {

    const currentUser = await getCurrentUser();
    const favorites = await getFavoriteListing();

    if (favorites.length === 0) {
        return <EmptyState
            title="No favorites found"
            subtitle="You have no favorite listings on your account."
        />;
    }

    return (
        <div>
            <FavoritesClient
                favorites={favorites}
                currentUser={currentUser}
            />
        </div>
    );
}

export default FavoritePage;