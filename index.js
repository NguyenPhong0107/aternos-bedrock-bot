require("dotenv").config();
const express = require("express");
const bedrock = require("bedrock-protocol");

const app = express();
app.get("/", (req,res)=>res.send("Bot Online"));

app.listen(process.env.PORT_HTTP || 3000,()=>{
    console.log("Web Server Running");
});

function startBot(){

    console.log("Đang kết nối...");

    const client = bedrock.createClient({
        host: process.env.HOST,
        port: Number(process.env.PORT),
        username: process.env.BOT_NAME,
        offline: true
    });

    client.on("join",()=>{
        console.log("Bot đã vào server!");

        // Hiển thị trạng thái định kỳ
        setInterval(()=>{
            console.log("Bot vẫn đang online...");
        },60000);

        // Có thể bổ sung gửi các packet di chuyển nếu thư viện hỗ trợ.
    });

    client.on("disconnect",()=>{
        console.log("Mất kết nối.");
        reconnect();
    });

    client.on("error",(err)=>{
        console.log(err.message);
        reconnect();
    });

    function reconnect(){
        console.log("Reconnect sau 10 giây...");
        setTimeout(startBot,10000);
    }
}

startBot();
