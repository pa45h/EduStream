import React from "react";

const TableSection = ({ title, headers, data, rowRenderer }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-yellow-50 mb-4">{title}</h2>
    {data?.length > 0 ? (
      <div className="overflow-x-auto rounded-lg border border-richblack-700">
        <table className="min-w-full text-sm text-left text-richblack-100">
          <thead className="bg-richblack-800 text-richblack-25">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-6 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-richblack-700 hover:bg-richblack-800/40"
              >
                {rowRenderer(item).map((cell, i) => (
                  <td key={i} className="px-6 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-richblack-300">No {title.toLowerCase()} found.</p>
    )}
  </div>
);

export default TableSection;
