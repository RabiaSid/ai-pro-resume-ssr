import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiX } from "react-icons/bi";

const Modal = ({ status, changeStatus, title, children }) => {
  return (
    <>
      <Transition appear show={status} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={changeStatus}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-h-[calc(100vh-200px)] overflow-y-scroll h-auto w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[rgba(255,255,255,1)] p-6 text-left align-middle shadow-xl transition-all relative border-x-[5px] border-x-[#00caa5] scroll-bar-hide">
                  <Dialog.Title
                    as="h3"
                    className="text-4xl font-bold leading-10 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {/* Close Button */}
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={changeStatus}
                  >
                    <BiX className="text-4xl" />
                  </div>
                  <div className="mt-2">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
