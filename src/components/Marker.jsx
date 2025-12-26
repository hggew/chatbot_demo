// src/components/Marker.jsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "./ui/button";

export default function MarkerCircle({ id, label, top, left, color, onClick }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    onClick={() => onClick(id)}
                    className={"bg-white absolute   transition-transform hover:scale-110 focus:scale-110"}
                    style={{
                        top, left,
                        width: "30px", height: "35px",
                        borderRadius: '100%',
                        border: `4px solid ${color}`,
                    }}
                />
            </TooltipTrigger>

            <TooltipContent
                className="z-50 rounded-md border border-gray-300 bg-white  text-md  shadow-md"
                side="top"
                style={{
                    backgroundColor: "white",
                    paddingLeft: "0.5rem",   // px-2
                    paddingRight: "0.5rem",  // px-2
                    "--radix-tooltip-arrow-size": "6px",
                    "--radix-tooltip-arrow-width": "6px",
                    "--radix-tooltip-arrow-height": "3px",
                    "--radix-tooltip-arrow-color": "white"
                }}
            >
                <p >{label}</p>
            </TooltipContent>
        </Tooltip >

    );
}

