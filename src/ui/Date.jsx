import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangeInput = ({ onChange }) => {
    const [range, setRange] = useState([null, null]);
    const [start, end] = range;

    return (
        <DatePicker
            selectsRange
            startDate={start}
            endDate={end}
            onChange={(update) => {
                setRange(update);
                if (update[0] && update[1]) {
                    onChange({
                        start: update[0].toISOString().slice(0, 10),
                        end: update[1].toISOString().slice(0, 10),
                    });
                }
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Выберите диапазон"
            className="date-range-input"
        />
    );
};
