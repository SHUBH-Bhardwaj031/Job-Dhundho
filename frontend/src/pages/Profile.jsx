export default function Profile() {
    return(
<div  className= "h-screen flex bg-black justify-between ">
<div className="border border-amber-500 w-1/3">
<div className="flex flex-col items-center justify-between">
    <div className=" text-white bg-gray-700 rounded border border-b-blue-600">
        <h1>Rahul Sharma</h1>
        <p>Full Stack Developer</p>
    </div>
    <div className="text-white  bg-gray-700 rounded-2xl">
        <h1>Skills</h1>
         <button className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium                          ">
            Add Skill
         </button>
    </div>
</div>
</div>
<div>Div2</div>


</div>
    )
}
