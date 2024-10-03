import React from 'react';

export default function UserInfoPage({ params }: { params: { userid: string } }) {
    return (
        <div className='text-white'>Chat display Page for user id: {params.userid}</div>
    )
}
