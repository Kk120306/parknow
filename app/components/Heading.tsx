'use client'

interface HeadingProps {
    title? : String, 
    subtitle? : String,
    center? : Boolean
}

const Heading : React.FC<HeadingProps> = ({
    title,
    subtitle,
    center 
}) => {
    return (  
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="text-neutral-500 font-light mt-2">
                {subtitle}
            </div>
        </div>
    );
}
 
export default Heading;