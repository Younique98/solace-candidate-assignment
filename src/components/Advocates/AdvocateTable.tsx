import { formatPhoneNumber } from '@/helpers/formatters'
import { IAdvocate } from '@/types/advocate'
import { TableSkeleton } from '../LoadingState/TableSkeleton'
import { ErrorMessage } from '../ErrorState/ErrorMessage'
import { TAdvocateKeys } from '@/app/api/advocates/route'
import { TSortOrder } from '@/hooks/useAdvocates'

interface IAdvocateTable {
    advocates: IAdvocate[]
    isLoading?: boolean
    error: string | null
    sortBy: TAdvocateKeys
    order: TSortOrder
    onRetry: () => void
    setSortBy: (sortBy: TAdvocateKeys) => void
    setOrder: (order: TSortOrder) => void
    onSort: () => void
}

export const AdvocateTable = ({
    advocates,
    isLoading,
    error,
    onRetry,
    setSortBy,
    setOrder,
    sortBy,
    order,
    onSort,
}: IAdvocateTable) => {
    if (error) return <ErrorMessage error={error} onRetry={onRetry} />
    if (isLoading) return <TableSkeleton />

    const handleSort = (value: TAdvocateKeys) => {
        setSortBy(value)
        onSort()
    }

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50">
                    <label className="flex items-center">
                        <span className="mr-2 text-sm font-medium text-gray-700">
                            Sort By:
                        </span>
                        <select
                            value={sortBy}
                            disabled={isLoading}
                            className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
                            onChange={(e) =>
                                handleSort(e.target.value as TAdvocateKeys)
                            }
                        >
                            <option value="firstName">First Name</option>
                            <option value="lastName">Last Name</option>
                        </select>
                    </label>
                    <label className="flex items-center">
                        <span className="mr-2 text-sm font-medium text-gray-700">
                            Order:
                        </span>

                        <select
                            value={order}
                            className="p-2 border border-gray-300 rounded-md"
                            onChange={(e) => {
                                const value = e.target.value
                                if (value === 'asc' || value === 'desc') {
                                    setOrder(value)
                                }
                            }}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="relative transition-all duration-300 ease-in-out">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
                        <div className="w-6 h-6 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <table className="w-full border-collapse bg-white transition-opacity duration-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                First Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Last Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                City
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Degree
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Specialties
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Years of Experience
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Phone Number
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {advocates.map((advocate, index) => {
                            return (
                                <tr
                                    key={`advocate-${advocate.id}-${index}`}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {advocate.firstName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {advocate.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {advocate.city}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {advocate.degree}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {advocate.specialties.map(
                                            (specialty, index) => (
                                                <span
                                                    key={`${advocate.id}-${specialty}-${index}`}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-700 text-white mr-2 mb-1"
                                                >
                                                    {specialty}
                                                </span>
                                            )
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {advocate.yearsOfExperience}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-900">
                                        {formatPhoneNumber(
                                            advocate.phoneNumber
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
