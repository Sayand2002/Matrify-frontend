import { VscTriangleDown } from "react-icons/vsc";
import { formatReceivedTime } from "../../utils/formateReceivedTime";

interface MessageReceivedProps {
    message: string;
    createdAt: string;
  }

export function MessageReceived ({ message, createdAt }: MessageReceivedProps) {
    return (
        <div className="">
            <div className="message-receive-message-container w-fit px-3 py-2 rounded-md bg-[#ccad77] relative text-white ml-14">
                <VscTriangleDown className="absolute text-[30px] top-[-9.258px] left-[-14px] text-[#ccad77]"/>
                {message}
            </div>
            <p className="text-[10px] pl-14 pt-2">{formatReceivedTime(createdAt)}</p>
        </div>
    )
}