import { useState } from "react"
import data from "./script"


// - Get the data
// - On button click show answer
// - Problem all answers were changing
// - Fix use ternary operator to only show the selected (also using useState hook)

export default function Accordian() {
    function unescape(data) {
        let doc = new DOMParser().parseFromString(data, "text/html");
        return doc.documentElement.textContent;
    }

    let [answers, setAnswers] = useState(null)
    let [selected, setSelected] = useState(null)
    function singleSelection(id) {
        const all_answers = [...data[id].incorrect_answers, data[id].correct_answer]
        setAnswers(all_answers)

        id === selected ? setSelected(null): setSelected(id)// If it is selected again remove the answers settig them to null
        

    }


    let [selected_items, setSelected_items] = []
    function multipeSelection(id)
    {
        const all_answers = [...data[id].incorrect_answers, data[id].correct_answer]
        setAnswers(all_answers)
        setSelected_items((prev)=>
        {
            return [...prev, id]
        })

    }
    return (

        <div className="Accordian">
            {
                data.map((item, index) => {
                    // Have to return jsx
                    return <div key={index} className="item">
                        <h4>{unescape(item.question)}</h4>
                        <button onClick={() => singleSelection(index)}>{selected === index? <p>Hide Answers</p>:<p>Show Answers</p>}</button>
                        <ul>

                            {selected == index ?
                                answers && answers.length > 0 ? // Handling edge case if no data is found
                                    answers.map((answer, index) => <li key={index}>{answer}</li>) : <li>No Data was Found</li>
                                : null}
                        </ul>
                    </div>
                })
            }

        </div>
    )
}