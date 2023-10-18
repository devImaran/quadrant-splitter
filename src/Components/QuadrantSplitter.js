import React, { useState } from 'react'

function QuadrantSplitter() {
    const [singleBackgroundColor, setSingleBackgroundColor] = useState('#4ef96e')
    const [splittedScreens, setsplittedScreens] = useState({})

    function splitScreenHandler(screenName, item, returnedValue) {
    
        if (screenName == 'initial') {
            let obj = {}
            for (let i = 0; i < 4; i++) {
                obj[`s${i}`] = { color: `#${generateRandomColor()}`, splittedScreens: {} }
            }
            setsplittedScreens(obj)
            return
        }

        if (returnedValue.length == 0) {
            for (let i = 0; i < 4; i++) {
                item['splittedScreens'][`${screenName}${i}`] = { color: `#${generateRandomColor()}`, splittedScreens: {} }
            }
            setsplittedScreens({ ...splittedScreens })
        }

    }

    function generateRandomColor(){
        return Math.floor(Math.random()*16777215).toString(16);
    }


    function renderSplittedScreens(data) {
        if (data.length == 0) {
            return data
        } else {
            return Object.values(data).map((item, index) => {
                const returnedValue = renderSplittedScreens(item.splittedScreens)
                return React.createElement(
                    "div",
                    {
                        id: Object.entries(data)[index][0],
                        className: 'splitted-screens splitted-sub-screens ',
                        style: { background: item.color },
                        onClick: () => { splitScreenHandler(Object.entries(data)[index][0], item, returnedValue) }
                    },
                    [returnedValue]
                )
            })
        }

    }

    return (
        <div className='App'>
            {
                JSON.stringify(splittedScreens) !== '{}' ?
                    <div className='splitted-screens'> {renderSplittedScreens(splittedScreens)}</div>
                    :
                    <div
                        className='main-screen'
                        style={{ background: singleBackgroundColor }}
                        onClick={() => splitScreenHandler('initial')}>
                    </div>
            }
        </div>
    );
}

export default QuadrantSplitter
