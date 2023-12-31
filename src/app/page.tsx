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
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Luxury Red Electronics",

      category: "Electronics",
      price: "$99.99",
      status: "disable",
      checked: false,
      date: "2023-04-15",
    },
    {
      id: 2,
      name: "Stylish Blue Clothing",

      category: "Clothing",
      price: "$49.99",
      status: "disable",
      checked: false,
      date: "2023-06-22",
    },
    {
      id: 3,
      name: "Natural Green Home Decor",

      category: "Home Decor",
      price: "$29.99",
      action: "View Details",
      status: "active",
      checked: false,
      date: "2023-01-10",
    },
    {
      id: 4,
      name: "Premium Black Furniture",

      category: "Furniture",
      price: "$199.99",
      action: "Add to Wishlist",
      status: "disable",
      checked: false,
      date: "2023-09-28",
    },
    {
      id: 5,
      name: "Bright Yellow Beauty Products",

      category: "Beauty",
      price: "$14.99",
      status: "disable",
      checked: false,
      date: "2023-07-03",
    },
    {
      id: 6,
      name: "Pure White Sports Equipment",

      category: "Sports",
      price: "$79.99",
      status: "active",
      checked: false,
      date: "2023-02-18",
    },
    {
      id: 7,
      name: "Fun Orange Toys",

      category: "Toys",
      price: "$19.99",
      status: "disable",
      checked: false,
      date: "2023-11-05",
    },
  ]);

  const [searchValue, setSeachValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [countSelectedProducts, setCountSelectedProducts] = useState(0);
  const [allCheckeds, setAllCheckeds] = useState(false);
  const [filter, setFilter] = useState("alphabetical");

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
          item.date.includes(searchValue.toLocaleLowerCase()) ||
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

  const calculeteFilter = useMemo(() => {
    switch (filter) {
      case "alphabetical":
        return filtred.sort((a, b) => (a.name > b.name ? 1 : -1));

      case "priceUp":
        return filtred.sort((a, b) => (a.price > b.price ? -1 : 1));

      case "pricedown":
        return filtred.sort((a, b) => (a.price > b.price ? 1 : -1));

      case "status":
        return filtred.sort((a, b) => (a.status > b.status ? 1 : -1));

      case "ancient":
        return filtred.sort((a, b) => (a.date > b.date ? 1 : -1));

      case "recent":
        return filtred.sort((a, b) => (a.date > b.date ? -1 : 1));

      default:
        return filtred;
    }
  }, [filter, filtred]);

  console.log(filter);

  return (
    <div className="bg-zinc-950 min-h-screen w-screen flex items-center pt-[150px] flex-col p-4 gap-8">
      <div className="flex items-center flex-col justify-center w-full lg:max-w-[1000px] mx-auto">
        <header
          className={`flex items-center justify-between gap-2 md:gap-8 w-full mb-4`}>
          <div
            className={`flex items-center justify-center gap-2 transition-opacity ${
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

            <p className="text-zinc-300 text-xs md:text-base whitespace-nowrap">
              {countSelectedProducts} checkeds
            </p>
          </div>

          <div className="flex items-start justify-center gap-4 w-full   ">
            <div className="relative flex-1 hidden lg:block">
              <MagnifyingGlass
                className="text-zinc-400 absolute top-3 left-2"
                size={20}
              />
              <input
                value={searchValue}
                onChange={(e) => setSeachValue(e.target.value)}
                type="text"
                className="h-10 rounded bg-zinc-800  w-full  pl-8 text-zinc-200"
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

            <select
              id="filter"
              defaultValue={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-zinc-800 w-[130px] h-10  text-zinc-50 text-sm rounded border-transparent border focus:ring-blue-500 focus:border-blue-500 p-2.5">
              <option value="alphabetical">Alphabetical</option>
              <option value="priceUp">Price Up</option>
              <option value="pricedown">Price Down</option>
              <option value="status">Status</option>
              <option value="recent">Recent</option>
              <option value="ancient">Ancient</option>
            </select>
          </div>

          <div
            className={`flex items-center gap-2 transition-opacity ${
              isSending ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <button
              onClick={handleTransferTrueCheckedList}
              className="button-send">
              Send
            </button>
            <button onClick={handleCancelSend} className="button-cancel">
              Cancel
            </button>
          </div>
        </header>

        {calculeteFilter.length > 0 ? (
          <div className="overflow-x-auto w-full rounded">
            <table className="w-full ">
              <thead className="text-xs text-zinc-300 text-left uppercase bg-zinc-800  ">
                <tr>
                  <th className="p-4"></th>
                  <th className="px-4 py-3">Product name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtred.map(
                  ({ id, name, category, price, status, date, checked }) => (
                    <tr
                      key={id}
                      className="bg-zinc-900 h-10 text-left text-zinc-300 border-zinc-800 border-b hover:bg-zinc-950 transition-colors ">
                      <th className=" flex items-center justify-center mt-3">
                        {status == "active" && (
                          <input
                            checked={checked}
                            onChange={(event) =>
                              handleActiveCheckedProduct(event, id)
                            }
                            type="checkbox"
                            className={`w-4 h-4  accent-green-500 ${
                              isSending || status !== "active"
                                ? "block"
                                : "hidden"
                            } bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 `}
                          />
                        )}
                      </th>
                      <th className="px-4 whitespace-nowrap">{name}</th>
                      <th className="px-4">{category}</th>
                      <th className="px-4">{price}</th>
                      <th className="px-4">
                        {format(new Date(date), "dd/MM/yyyy")}
                      </th>
                      <th className="text-center flex items-center justify-center h-full">
                        {status == "active" && (
                          <p className=" py-0.5 w-[80px] bg-green-500 text-green-950 font-semibold text-center rounded">
                            Active
                          </p>
                        )}

                        {status == "disable" && (
                          <p className="  py-0.5  w-[80px] bg-red-500 text-red-950 font-semibold text-center rounded">
                            Disable
                          </p>
                        )}

                        {status == "sent" && (
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
                            status={status}
                            id={id}
                            activeProduct={handleActiveProduct}
                            disableProduct={handleDisableProduct}
                            setIsSending={setIsSending}
                            handleDeleteProductSent={handleDeleteProductSent}
                          />
                        </DropdownMenu.Root>
                      </th>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-zinc-200 text-lg text-center py-4">
            There are no products
          </p>
        )}
      </div>

      {filtred.length > 0 && (
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
      )}
    </div>
  );
}
