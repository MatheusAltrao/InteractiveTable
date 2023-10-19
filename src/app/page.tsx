"use client";

import { DotsThree } from "@phosphor-icons/react";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr/WarningCircle";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { useState } from "react";
export type ListObject = {
  id: number;
  name: string;
  color: string;
  category: string;
  price: string;
  status: boolean;
  date: string;
};

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      color: "Red",
      category: "Electronics",
      price: "$99.99",
      status: "disable",
    },
    {
      id: 2,
      name: "Product 2",
      color: "Blue",
      category: "Clothing",
      price: "$49.99",
      status: "disable",
    },
    {
      id: 3,
      name: "Product 3",
      color: "Green",
      category: "Home Decor",
      price: "$29.99",
      action: "View Details",
      status: "active",
    },
    {
      id: 4,
      name: "Product 4",
      color: "Black",
      category: "Furniture",
      price: "$199.99",
      action: "Add to Wishlist",
      status: "active",
    },
    {
      id: 5,
      name: "Product 5",
      color: "Yellow",
      category: "Beauty",
      price: "$14.99",
      status: "disable",
    },
    {
      id: 6,
      name: "Product 6",
      color: "White",
      category: "Sports",
      price: "$79.99",
      status: "active",
    },
    {
      id: 7,
      name: "Product 7",
      color: "Orange",
      category: "Toys",
      price: "$19.99",
      status: "disable",
    },
    {
      id: 8,
      name: "Product 8",
      color: "Purple",
      category: "Books",
      price: "$9.99",
      status: "disable",
    },
    {
      id: 9,
      name: "Product 9",
      color: "Brown",
      category: "Appliances",
      price: "$299.99",
      status: "disable",
    },
    {
      id: 10,
      name: "Product 10",
      color: "Pink",
      category: "Jewelry",
      price: "$69.99",
      status: "disable",
    },
  ]);

  const [searchValue, setSeachValue] = useState("");

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

  return (
    <div className="bg-zinc-950 h-screen w-screen flex items-center justify-center flex-col gap-8">
      <div>
        <div className="relative w-[300px]">
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
              <X className="text-zinc-200 absolute top-3 right-2" size={18} />
            </button>
          )}
        </div>

        <div className="relative overflow-x-auto flex items-center justify-center rounded flex-col  mx-auto">
          <table className=" h-[680px] w-[820px] ">
            <thead className="text-xs text-zinc-300 uppercase bg-zinc-800  ">
              <tr>
                <th className="p-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="checkbox" />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
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
                  className="bg-zinc-900  text-zinc-300 border-zinc-800 border-b hover:bg-zinc-800 transition-colors ">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap ">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.color}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    {item.status == "active" ? (
                      <p className="px-2 py-0.5 bg-green-900 text-center rounded">
                        Activated
                      </p>
                    ) : (
                      <p className="px-2  py-0.5  bg-red-900 text-center rounded">
                        Disabled
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <DotsThree size={22} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
