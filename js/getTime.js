function tick() {
            var today=new Date();
            var month=today.getMonth()+1;<!--getMonth显示当前月份-1，所以要+1才能显示当前月份-->
            var year, date;


            intHours = today.getHours();
            intMinutes = today.getMinutes();
            intSeconds = today.getSeconds();
            year=today.getFullYear();
            date=today.getDate();

            timeString="保存日期为："+year+"年"+month+"月"+date+"日 ";
            time.innerHTML = timeString;
            window.setTimeout("tick();", 1000);
        }
        window.onload = tick;