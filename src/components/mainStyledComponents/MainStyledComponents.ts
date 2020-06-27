import styled from "styled-components";

export const AdminWrapper = styled.div`
    margin-left: 265px;
    padding: 30px 60px;
`


export const AdminHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &>span{
        color: #000000;
        font-family: 'Balsamiq Sans', cursive;
        font-weight: 500;
        font-size: 24px;
        line-height: 150%;
    }
    
    &>div{
        font-weight: 500;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.5);
        display: flex;
        
        &>div{
            cursor: pointer;
            margin-left: 25px;
            display: flex; 
            align-items: center;
            &>span{
                margin-left: 5px;
            }
        }
    }
`

export const Line = styled.hr`
    background:  rgba(50, 10, 81, 0.1);
    border: none;
    height: 1px;
    margin: 15px 0 25px 0;
    border-radius: 50px;
`


export const Close = styled.div`
    position: absolute;
    top: 18px;
    right: 20px;
    cursor: pointer;
`
export const GreenBtn = styled.button`
    background: #20CF54;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    border: none;
    color: #FFFFFF;
    cursor: pointer;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-family: 'Balsamiq Sans', cursive;

`

export const Input = styled.input`
    background: #F8F8F8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    height: 36px;
    margin-top: 5px;
    padding: 0 0 0 9px;
    font-family: 'Balsamiq Sans', cursive;
    font-weight: 200;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
`

export const TextArea = styled.textarea`
    background: #F8F8F8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    resize: vertical;
    height: 70%;
    margin-top: 5px;
    padding: 5px 0 0 9px;
    font-family: 'Balsamiq Sans', cursive;
    font-weight: 200;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
`

export const TableWrapper = styled.div`
    margin-top: 80px;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    border-bottom: none;
    box-sizing: border-box;
`


export const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1.4fr 1fr 1.3fr 1fr ;
    background: #00BDD0;
    text-align: center;
    
    &>div{
        padding: 15px 0;
        font-size: 18px;
        color: #FFFFFF;

        border-right: 1px solid #C4C4C4;
        font-size: 16px;
        line-height: 21px;
    }
`

export const TableList = styled.div`
    display: grid;
    grid-template-columns: 1.4fr 1fr 1.3fr 1fr ;
    border-bottom: 1px solid #C4C4C4;
    
    &>div{
        padding: 15px 0;
        border-right: 1px solid #C4C4C4;
        font-size: 16px;
        line-height: 21px;
        padding-left: 10px;
        white-space: nowrap; /* Запрещаем перенос строк */
        overflow: hidden;
        text-overflow: ellipsis;
    }
`


export const Last = styled.div`
    text-align: center;
    border-right: none !important;
`

export const DownloadPictureWrapper = styled.div`
    width: 90px;
    height: 90px;
    text-align: center;
    background: #F8F8F8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 20px auto;
    border-radius: 50px;
    display: flex;
    align-items: center;
    
    &>img{
        margin: auto;
    }
    
`