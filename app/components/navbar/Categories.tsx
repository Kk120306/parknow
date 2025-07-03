'use client'

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import {
    BsHouseDoor,
    BsBuilding,
    BsTruck,
    BsPlug,
    BsCalendar,
    BsClock,
    BsGeoAlt,
} from "react-icons/bs";
import { FaAccessibleIcon } from "react-icons/fa";
import { PiBuildingApartment } from "react-icons/pi";
import { LuSquareParking, LuWarehouse } from "react-icons/lu";
import { IoCarSportOutline } from "react-icons/io5";
import { MdDirectionsBike } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";





export const categories = [
    {
        label: "Home",
        icon: BsHouseDoor,
        description: "Private residential driveway or garage spots",
    },
    {
        label: "Apartment",
        icon: PiBuildingApartment,
        description: "Designated parking in apartment buildings",
    },
    {
        label: "Commercial",
        icon: BsBuilding,
        description: "Business-owned or office parking spaces",
    },
    {
        label: "Street",
        icon: LuSquareParking,
        description: "Curbside or street-level parking spots",
    },
    {
        label: "Warehouse",
        icon: LuWarehouse,
        description: "Spacious indoor spots for storage or large vehicles",
    },
    {
        label: "Covered",
        icon: IoCarSportOutline,
        description: "Covered spots with protection from weather",
    },
    {
        label: "Uncovered",
        icon: BsGeoAlt,
        description: "Open-air parking without a roof",
    },
    {
        label: "EV",
        icon: BsPlug,
        description: "Spots equipped with electric vehicle chargers",
    },
    {
        label: "Handicap",
        icon: FaAccessibleIcon,
        description: "Accessible parking for individuals with disabilities",
    },
    {
        label: "Motorbike",
        icon: MdDirectionsBike,
        description: "Smaller spots designed for motorcycles",
    },
    {
        label: "Short",
        icon: BsClock,
        description: "Hourly or daily rental parking",
    },
    {
        label: "Long",
        icon: BsCalendar,
        description: "Monthly or extended duration parking options",
    },
    {
        label: "Truck/Van",
        icon: BsTruck,
        description: "Larger spaces for trucks, vans, or RVs",
    },
];


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isMainPage = pathName === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className=" pt-4 flex flex-row items-center justify-between overflow-x-auto" >
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={item.label === category}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;