import { Button, PageHeading } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Actions() {
  return (
    <Button icon="user" size="lg">
      Create New User
    </Button>
  );
}

const people = [
  {
    name: "Test User",
    email: "test1@test.net",
    role: "customer",
  },
  {
    name: "Logan Ice",
    email: "test2@test.net",
    role: "employee",
  },
  {
    name: "Guillermo Casablanca",
    email: "test3@test.net",
    role: "admin",
  },
];

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading actions={<Actions />}>Users</PageHeading>
      <div className="inline-block min-w-full pb-2 align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {people.map((person) => (
                <tr key={person.email}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                    {person.name}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {person.email}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {person.role}
                  </td>
                  <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {person.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft aria-hidden="true" className="size-5" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight aria-hidden="true" className="size-5" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
