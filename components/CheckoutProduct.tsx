import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { urlFor } from "../sanity";
import { removeFromBasket } from "../redux/basketSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


interface Props {
  items: Product[];
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
    const dispatch = useDispatch();
  
    const removeItemFromBasket = () => {
      dispatch(removeFromBasket({ id }));
  
      toast.error(`${items[0].title} removed from basket`, {
        position: "bottom-center",
      });
    };

  return (
    <div className="pb-5 gap-x-4 flex flex-col lg:flex-row border-b hover:border-b-4 border-gray-300 group">
      <div className="relative h-44 w-44 bg-white">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
          alt="/"
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center	">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>
          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details <ChevronDownIcon className="h-6 w-6" />
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-xl lg:text-2xl">
              ${items.reduce((total, item) => total + item.price, 0)}.00
          </h4>
          <button className="text-blue-500 hover:underline" onClick={removeItemFromBasket}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
