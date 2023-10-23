"use client";

import MenuItem from "@/components/menuItem";
import {
  DotsThree,
  MagnifyingGlass,
  Minus,
  Plus,
  X,
} from "@phosphor-icons/react";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr/WarningCircle";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      color: "Red",
      category: "Electronics",
      price: "$99.99",
      status: "disable",
      checked: false,
    },
    {
      id: 2,
      name: "Product 2",
      color: "Blue",
      category: "Clothing",
      price: "$49.99",
      status: "sent",
      checked: false,
    },
    {
      id: 3,
      name: "Product 3",
      color: "Green",
      category: "Home Decor",
      price: "$29.99",
      action: "View Details",
      status: "active",
      checked: false,
    },
    {
      id: 4,
      name: "Product 4",
      color: "Black",
      category: "Furniture",
      price: "$199.99",
      action: "Add to Wishlist",
      status: "sent",
      checked: false,
    },
    {
      id: 5,
      name: "Product 5",
      color: "Yellow",
      category: "Beauty",
      price: "$14.99",
      status: "disable",
      checked: false,
    },
    {
      id: 6,
      name: "Product 6",
      color: "White",
      category: "Sports",
      price: "$79.99",
      status: "active",
      checked: false,
    },
    {
      id: 7,
      name: "Product 7",
      color: "Orange",
      category: "Toys",
      price: "$19.99",
      status: "disable",
      checked: false,
    },
  ]);
  const [searchValue, setSeachValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [countSelectedProducts, setCountSelectedProducts] = useState(0);
  const [allCheckeds, setAllCheckeds] = useState(false);

  useEffect(() => {
    setCountSelectedProducts(products.filter((item) => item.checked).length);

    if (
      products.filter((item) => item.status == "active").length ==
      countSelectedProducts
    ) {
      setAllCheckeds(true);
    } else {
      setAllCheckeds(false);
    }
  }, [products, allCheckeds, countSelectedProducts]);

  const filtred = searchValue
    ? products.filter(
        (item) =>
          item.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) ||
          item.category
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) ||
          item.color
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) ||
          item.price
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) ||
          item.status
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
      )
    : products;

  function handleActiveProduct(itemId: number) {
    const updateStatusProduct = products.map((item) =>
      item.id === itemId ? { ...item, status: "active" } : item
    );

    setProducts(updateStatusProduct);
  }

  function handleDisableProduct(itemId: number) {
    const updateStatusProduct = products.map((item) =>
      item.id === itemId ? { ...item, status: "disable" } : item
    );

    setProducts(updateStatusProduct);
  }

  function handleActiveCheckedProduct(
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) {
    const { checked } = event.target;
    const updatedProducts = products.map((item) =>
      item.id === itemId ? { ...item, checked } : item
    );

    setProducts(updatedProducts);
  }

  function handleCancelSend() {
    const updateProducts = products.map((item) =>
      item ? { ...item, checked: false } : item
    );
    setProducts(updateProducts);
    setIsSending(false);
  }

  function handleCheckAll() {
    const updateProducts = products.map((item) =>
      item.status == "active" ? { ...item, checked: true } : item
    );
    setProducts(updateProducts);
  }

  function handleUnCheckAll() {
    const updateProducts = products.map((item) =>
      item.status == "active" ? { ...item, checked: false } : item
    );
    setProducts(updateProducts);
  }

  function handleTransferTrueCheckedList() {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.checked) {
          return { ...item, status: "sent", checked: false };
        } else {
          return item;
        }
      })
    );

    setIsSending(false);
  }

  function handleDeleteProductSent(itemId: number) {
    const updatedProducts = products.filter((item) => item.id !== itemId);
    setProducts(updatedProducts);
  }

  console.log(products);

  return (
    <div className="bg-zinc-950 h-screen w-screen flex items-center justify-center flex-col gap-8">
      <div>
        <div
          className={`flex items-center justify-between gap-8"
          }`}>
          <div
            className={`flex items-center gap-2 transition-opacity ${
              isSending ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            {allCheckeds ? (
              <button
                onClick={handleUnCheckAll}
                className="text-white font-medium  border border-transparent bg-red-600 border-white transition-colors rounded">
                <Minus size={22} />
              </button>
            ) : (
              <button
                onClick={handleCheckAll}
                className="text-white font-medium  border border-transparent bg-blue-600 border-white transition-colors rounded">
                <Plus size={22} />
              </button>
            )}

            <p className="text-zinc-300">{countSelectedProducts} checkeds</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-[400px]">
              <MagnifyingGlass
                className="text-zinc-400 absolute top-3 left-2"
                size={20}
              />
              <input
                value={searchValue}
                onChange={(e) => setSeachValue(e.target.value)}
                type="text"
                className="h-10 rounded bg-zinc-800 mb-2 w-full  pl-8 text-zinc-200"
                placeholder="Search for any item in the table"
              />
              {searchValue.length > 0 && (
                <button onClick={() => setSeachValue("")}>
                  <X
                    className="text-zinc-200 absolute top-3 right-2"
                    size={18}
                  />
                </button>
              )}
            </div>
          </div>

          <div
            className={`flex items-center gap-2 transition-opacity ${
              isSending ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <button
              onClick={handleTransferTrueCheckedList}
              className="text-blue-500 font-medium px-3 py-1 border border-transparent   hover:border-blue-500 transition-colors rounded">
              Send
            </button>
            <button
              onClick={handleCancelSend}
              className="text-red-500 font-medium px-3 py-1 border border-transparent hover:border-red-500 transition-colors rounded">
              Cancel
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto  rounded flex-col mt-4 border-[#3f3f3f] overflow-hidden border mx-auto">
          {products.length > 0 ? (
            <table className="  w-[820px] ">
              <thead className="text-xs text-zinc-300 uppercase bg-zinc-800  ">
                <tr>
                  <th className="p-4"></th>
                  <th className="px-6 py-3">Product name</th>
                  <th className="px-6 py-3">Color</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtred.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-zinc-900 h-10 text-zinc-300 border-zinc-800 border-b hover:bg-zinc-950 transition-colors ">
                    <th className=" flex items-center justify-center mt-3">
                      {item.status == "active" && (
                        <input
                          checked={item.checked}
                          onChange={(event) =>
                            handleActiveCheckedProduct(event, item.id)
                          }
                          type="checkbox"
                          className={`w-4 h-4 text-blue-600 ${
                            isSending || item.status !== "active"
                              ? "block"
                              : "hidden"
                          } bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 `}
                        />
                      )}
                    </th>
                    <th className="text-center">{item.name}</th>
                    <th className="text-center">{item.color}</th>
                    <th className="text-center">{item.category}</th>
                    <th className="text-center">{item.price}</th>
                    <th className="text-center flex items-center justify-center h-full">
                      {item.status == "active" && (
                        <p className=" py-0.5 w-[80px] bg-green-500 text-green-950 font-semibold text-center rounded">
                          Active
                        </p>
                      )}

                      {item.status == "disable" && (
                        <p className="  py-0.5  w-[80px] bg-red-500 text-red-950 font-semibold text-center rounded">
                          Disable
                        </p>
                      )}

                      {item.status == "sent" && (
                        <p className="  py-0.5 w-[80px]  bg-blue-500 text-blue-950 font-semibold text-center rounded">
                          Sent
                        </p>
                      )}
                    </th>
                    <th>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger disabled={isSending} asChild>
                          <DotsThree
                            className={`hover:text-zinc-50  flex items-center justify-center w-full transition-colors ${
                              isSending
                                ? "cursor-not-allowed opacity-40"
                                : "cursor-pointer"
                            }`}
                            size={22}
                          />
                        </DropdownMenu.Trigger>
                        <MenuItem
                          status={item.status}
                          id={item.id}
                          activeProduct={handleActiveProduct}
                          disableProduct={handleDisableProduct}
                          setIsSending={setIsSending}
                          handleDeleteProductSent={handleDeleteProductSent}
                        />
                      </DropdownMenu.Root>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-zinc-200 text-lg text-center py-4">
              There are no products
            </p>
          )}

          {products.length > 0 && filtred.length == 0 && (
            <div className="flex items-center justify-center absolute top-16 gap-2">
              <WarningCircle className="text-red-500 " size={22} />
              <p className="text-zinc-200 text-lg text-center ">
                check if you typed it correctly
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-1">
        <div className="flex items-center justify-center gap-2 text-zinc-400  ">
          <button className="hover:text-zinc-50 transition-colors">
            <CaretLeft size={22} />
          </button>
          <button className="hover:text-zinc-50 transition-colors">
            <CaretRight size={22} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm ">
          <div>
            <p>1</p>
          </div>
          <div>
            <p>de</p>
          </div>
          <div>
            <p>1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
