import React from 'react';

function Result(props) {

    const boxes = props.movie.map(
        (item,idx) => {
            return <Box key={idx} image={item.poster_path} title={item.original_title} rating={item.vote_average} />
        }
    )

    return (
        <div className='w-full grid md:grid-cols-3 gap-5 '>
            {boxes}
        </div>
    );
}

export default Result;


const Box = (props) => {

    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    return (
        <div className='shadow min-h-[200px] border mt-3 pb-2'>
            <img src={IMGPATH + props.image} alt="" className='w-full' />
            <div className='flex justify-between px-2 items-center'>
                <span className='text-2xl '>{props.title}</span>
                <span className='text-xl text-yellow-600 font-bold'>{props.rating}</span>
            </div>
        </div>
    )
}