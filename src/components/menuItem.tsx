import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface MenuItemProps {
  id: number;
  status: string;
  activeProduct: any;
  disableProduct: any;
  setIsSending: (v: boolean) => void;
  handleDeleteProductSent: (itemId: number) => void;
}
const MenuItem = ({
  id,
  status,
  activeProduct,
  disableProduct,
  setIsSending,
  handleDeleteProductSent,
}: MenuItemProps) => {
  return (
    <DropdownMenu.Content
      className={`bg-zinc-950 border border-zinc-400 rounded w-[200px] -right-2 p-2 space-y-1 absolute z-30`}>
      <DropdownMenu.Item className=" cursor-pointer">
        {" "}
        {status == "active" && (
          <button
            className="w-full flex items-center justify-start hover:bg-zinc-900 px-1 rounded"
            onClick={() => disableProduct(id)}>
            Disable
          </button>
        )}
        {status == "disable" && (
          <button
            className="w-full flex items-center justify-start hover:bg-zinc-900 px-1 rounded"
            onClick={() => activeProduct(id)}>
            Active
          </button>
        )}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onClick={() => handleDeleteProductSent(id)}
        className="hover:bg-zinc-900 px-1 rounded cursor-pointer w-full text-left">
        Delete
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onClick={() => setIsSending(true)}
        className="hover:bg-zinc-900 px-1 rounded cursor-pointer text-left ">
        Deliver
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  );
};

export default MenuItem;
