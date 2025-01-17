import React, { useState } from 'react'
export const MainPage: React.FC = () => {
    // const data = [
    //     [0.3, 0.3, 0.4],
    //     [0.8, 0.2, 0.2]
    // ]

    // const getData = (index: number) => {
    //     return data[index]
    // }

    const [data] = useState('')

    const onLoad = {}

    return (
        <div>
            Main Page
            {/* TODO some while-loading stuff */}
            {/* <div>{`${main()}`}</div>
            <div> Main page</div> */}
        </div>
        // <div className="flex overflow-hidden">
        //     <div className="w-full h-screen flex justify-center">Main page here</div>
        //     <div className="mt-2 px-2 w-full d-flex flex-column">
        //         <h2 className="mx-auto text-center">Specialty breakdown</h2>
        //         {[0, 1].map((index) => (
        //             <div className="flex flex-row" key={index}>
        //                 <CanvasHistogram
        //                     key={index}
        //                     data={getData(index)}
        //                     width={110}
        //                     height={100}
        //                     margin={{ top: 10, right: 10, bottom: 20, left: 20 }}
        //                     color={SPECIALTY_COLORS[0]}
        //                     resolution={1.5}
        //                 />
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
}
