import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RowData } from "./Table";
import axios from "axios";

export default function Views() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [orderItem, setOrderItems] = React.useState<RowData | any>({});
  const [isEditEnabled, setIsEditEnabled] = React.useState(false);

  const onEditChanged = (event: any) => {
    const { name, value } = event.target;
    const newItem = { ...orderItem };
    newItem[name] = value;
    setOrderItems({ ...newItem });
    console.log({ orderItem });
  };

  React.useEffect(() => {
    if (state) {
      console.log(state);
      setOrderItems(state);
    }
  }, []);

  const toggleEdit = (event: React.MouseEvent) => {
    event.preventDefault();

    setIsEditEnabled(!isEditEnabled);
  };

  const deleteTableData = (event: any) => {
    event.preventDefault();
    if (orderItem._id) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/order_items/${orderItem?._id}`)
        .then(function (response) {
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    }
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="w-full md:w-3/4 mx-auto">
        <div className="w-full">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Order Items
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              View Order Items Detail
            </p>
          </div>
        </div>
        <div className="mt-5 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="freight_value"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Freight Value
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="freight_value"
                      id="freight_value"
                      onChange={onEditChanged}
                      value={orderItem?.freight_value}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="order_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Order ID
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="order_id"
                      id="order_id"
                      value={orderItem?.order_id}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="order_item_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Order Item ID
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="order_item_id"
                      id="order_item_id"
                      value={orderItem?.order_item_id}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="price"
                      id="price"
                      value={orderItem?.price}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="product_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Id
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="product_id"
                      id="product_id"
                      value={orderItem?.product_id}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="seller_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Seller ID
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="seller_id"
                      id="seller_id"
                      value={orderItem?.seller_id}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="shipping_limit_date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Shipping Limit Date
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="shipping_limit_date"
                      id="shipping_limit_date"
                      value={orderItem?.shipping_limit_date}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      readOnly={!isEditEnabled}
                      name="_id"
                      id="_id"
                      value={orderItem?._id}
                      className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex gap-4 text-right sm:px-6">
                <button
                  onClick={toggleEdit}
                  className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {isEditEnabled ? "Save" : "Edit"}
                </button>
                <button
                  onClick={deleteTableData}
                  className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
