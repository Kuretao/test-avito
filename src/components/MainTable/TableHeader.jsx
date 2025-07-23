import React from "react";

export default function TableHeader() {
    return (
        <thead>
            <tr style={{borderBottom: "1px solid #e2e8f0", background: "#f9fafb"}}>
                <th style={{padding: "12px 10px", textAlign: "left", fontWeight: 600, fontSize: "14px"}}>Дата</th>
                <th style={{padding: "12px 10px", textAlign: "left", fontWeight: 600, fontSize: "14px"}}>Сумма</th>
                <th style={{padding: "12px 10px", textAlign: "left", fontWeight: 600, fontSize: "14px"}}>Запрос на выплату</th>
                <th style={{padding: "12px 10px", textAlign: "left", fontWeight: 600, fontSize: "14px"}}>Куда перевести</th>
                <th style={{padding: "12px 10px", textAlign: "left", fontWeight: 600, fontSize: "14px"}}>Статус</th>
            </tr>
        </thead>
    );
}
