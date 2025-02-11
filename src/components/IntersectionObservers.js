// import { useEffect } from "react";

// export default function ViewPort() {
//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach((entry) => {
//                 if(entry.isIntersecting)
//                 console.log(entry.target);
//             });
//         });

//         const target = document.getElementById("box5");
//         if (target) {
//             observer.observe(target);
//         }

//     }, []);

//     return (
//         <div>
//             <div className="box h-72 w-full bg-slate-100">Box1</div>
//             <div className="box h-72 w-auto bg-slate-200">Box2</div>
//             <div className="box h-72 w-auto bg-slate-300">Box2</div>
//             <div id="box3" className="box h-72 w-auto bg-slate-400">Box3</div>
//             <div className="box h-72 w-auto bg-slate-500">Box4</div>
//             <div id="box5" className="box h-72 w-auto bg-slate-600">Box5</div>
//         </div>
//     );
// }

import { useEffect, useRef } from "react";

export default function ViewPort() {
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    targetRef.current.textContent = "Hello";  // ✅ Fixed property name
                }
            });
        });

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

    }, []);

    return (
        <div>
            <div className="box h-72 w-full bg-slate-100">Box1</div>
            <div className="box h-72 w-auto bg-slate-200">Box2</div>
            <div className="box h-72 w-auto bg-slate-300">Box3</div>
            <div id="box3" className="box h-72 w-auto bg-slate-400">Box4</div>
            <div className="box h-72 w-auto bg-slate-500">Box5</div>
            <div ref={targetRef} className="box h-72 w-auto bg-slate-600">Box6</div> {/* ✅ Corrected ref assignment */}
        </div>
    );
}
