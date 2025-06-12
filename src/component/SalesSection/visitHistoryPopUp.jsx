import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const VisitHistoryPopup = ({ visits, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Visit History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        <div className="space-y-4">
          {visits?.map((visit) => (
            <div key={visit._id} className="border-b pb-4">
              <div className="text-sm text-gray-500">
                {format(new Date(visit.createdAt), "PPp")}
              </div>
              <div className="font-medium">{visit.purpose}</div>
              {visit?.itemDetails.length >0 && (
                <div className="text-sm">
                Items:{" "}
                {visit.itemDetails
                  ?.map((item) => `${item.item.itemName} (${item.dose})`)
                  .join(", ")}
              </div>
              )}
             

              <div className="text-sm">Price: ${visit.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitHistoryPopup;
