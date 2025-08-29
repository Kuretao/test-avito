import {Dropdown} from "../../ui/Dropdown.jsx";
import Input from "../../ui/Input.jsx";
import {Modal} from "./Modal.jsx";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {zapros_na_vyplaty} from "../../api/apiMetods.js";

const ModalContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  span {
    font-family: Manrope, sans-serif;
    font-weight: 500;
    font-size: 13px;
    line-height: 100%;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    color: #94a3bb;
  }

  hr {
    width: 100%;
    height: 1px;
    border: none;
    background-color: #cbd5e1;
  }
`;

const ModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div {
    margin: 0;
  }

  > :first-child {
    width: 100%;
    height: 40px;

    > div {
      height: 100%;
        border: 1px solid #94A3BB;
        
        span{
            color: #64748B;
        }
    }
  }
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: ${({ error }) => (error ? "red" : "#475569")};
`;

const ModalButton = styled.button`
    padding: 8px 14px;
    margin-left: auto;
    max-height: 40px;
    width: max-content;
    border-radius: 6px;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 16px;
    leading-trim: NONE;
    line-height: 24px;
    letter-spacing: 0;
    text-align: center;
    color: #fff;
    background-color: #006999;

    position: relative;
    z-index: 10;
    pointer-events: auto;
`

function PayoutModal({ partner, balance, onClose, inn, idAcc }) {
    const [payoutMethod, setPayoutMethod] = useState("bank");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const minAmount = 5000;
    const userId = partner?.contact_id || idAcc;

    const numericWithdrawAmount = Number(withdrawAmount);
    const remaining = balance - numericWithdrawAmount;
    useEffect(() => {
        if (partner?.contact_id) {
            setPartnerId(partner.contact_id);
        } else if (idAcc) {
            setPartnerId(idAcc);
        }
    }, [partner, idAcc]);
    const validateAmount = () => {
        return (
            withdrawAmount &&
            !isNaN(numericWithdrawAmount) &&
            numericWithdrawAmount >= minAmount &&
            numericWithdrawAmount <= balance
        );
    };


    useEffect(() => {
        if (!withdrawAmount) {
            setError("Введите сумму вывода");
        } else if (isNaN(numericWithdrawAmount)) {
            setError("Сумма должна быть числом");
        } else if (numericWithdrawAmount < minAmount) {
            setError(`Минимальная сумма вывода ${minAmount.toLocaleString("ru-RU")} руб.`);
        } else if (numericWithdrawAmount > balance) {
            setError(`Максимальная сумма вывода не может превышать баланс (${balance.toLocaleString("ru-RU")} руб.)`);
        } else {
            setError("");
        }
    }, [withdrawAmount, numericWithdrawAmount, balance]);


    const handleRequestPayout = async () => {
        if (!validateAmount()) return;
        setLoading(true);

        const payloadBank = {
            user_id: Number(userId),
            user_paymenttype: "bank",
            user_amount: numericWithdrawAmount,
            user_balance: balance,
            user_inn: inn,
            user_accountID: String(userId),
        };


        const payloadB2b = {
            user_id: Number(partnerId),
            user_paymenttype: "b2b",
            user_amount: remaining,
            user_balance: balance,
            user_inn: inn,
            user_accountID: partnerId,
        };

        const payloadB2bOnly = {
            user_id: Number(partnerId),
            user_paymenttype: "b2b",
            user_amount: numericWithdrawAmount,
            user_balance: balance,
            user_inn: inn,
            user_accountID: partnerId,
        };
        console.log("payloadBank:", payloadBank);
        console.log("payloadB2b:", payloadB2b);

        try {
            if (payoutMethod === "bank") {
                if (remaining <= 0) {
                    await zapros_na_vyplaty(payloadBank);
                } else {
                    await zapros_na_vyplaty(payloadBank);
                    await zapros_na_vyplaty(payloadB2b);
                }
            } else if (payoutMethod === "b2b") {
                await zapros_na_vyplaty(payloadB2bOnly);
            }

            onClose();
        } catch (e) {
            console.error("Ошибка при запросе выплаты:", e);
        } finally {
            setLoading(false);
        }
    };
    const payoutOptions = [
        { value: "bank", label: "Перевод на банковский счет" },
        { value: "b2b", label: "Перевод на кошелек B2BHELP" },
    ];

    return (
        <Modal
            ModalTitle="Запрос на выплату"
            onClose={onClose}
            disabled={loading || !validateAmount()}
            handleRequestPayout={handleRequestPayout}
            loading={loading}
            validateAmount={validateAmount}
        >
            <ModalContent onSubmit={(e) => {
                e.preventDefault();
                handleRequestPayout();
            }}>
        <span>
          Минимальная сумма для вывода – 5 000 руб. Максимум – ваш текущий баланс ({balance.toLocaleString("ru-RU")} руб.)
            {payoutMethod === "bank"
                ? ", при частичном выводе остаток зачисляется на B2B кошелек."
                : ", остаток остается на балансе."}
        </span>
                <hr />

                <ModalInputs>
                    {/*<Label htmlFor="payout-method">Способ вывода</Label>*/}
                    <Dropdown
                        id="payout-method"
                        value={payoutMethod}
                        onChange={(val) => setPayoutMethod(val)}
                        options={payoutOptions}
                    />

                    {/*<Label htmlFor="withdraw-amount">Сумма для вывода</Label>*/}
                    <Input
                        id="withdraw-amount"
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="Введите сумму"
                        min={minAmount}
                        max={balance} icon={' '}
                    />
                    {/*<InfoText error={!!error}>{error}</InfoText>*/}

                    {/*<Label>ИНН (не редактируется)</Label>*/}
                    <Input value={inn} readOnly  icon={' '}/>

                    {/*<Label>ID аккаунта B2BHELP (не редактируется)</Label>*/}
                    <Input value={idAcc} readOnly  icon={' '}/>

                    {/*<Label>Остаток после вывода</Label>*/}
                    <Input value={remaining >= 0 ? remaining.toLocaleString("ru-RU") + " руб." : ""} readOnly icon={' '} />
                </ModalInputs>

                <hr />

                <ModalButton
                    type="button"
                    onClick={() => {
                        console.log('[ModalButton] click');
                        handleRequestPayout();
                    }}
                >
                    Запросить выплату
                </ModalButton>
            </ModalContent>
        </Modal>
    );
}

export default PayoutModal;