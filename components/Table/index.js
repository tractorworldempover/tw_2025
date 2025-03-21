import React from 'react';

export default function Table({ data }) {
    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[#DEE2E6] sm:border-t-[1px] border-b-[1px]">
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {row.tablData && row.tablData.map((item, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-200 p-2 text-gray-700">
                                    {item.td}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
