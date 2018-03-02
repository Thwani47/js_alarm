
$(document).ready(function(){
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var x;

var tone_src = loadTone($("#tone_selection").val());

        $("#remDays").html("No");
        $("#remHours").html("Alarms");
        $("#remMin").html("Set");
        $("#remSec").html("Yet");

    setInterval(function(){
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth();
        var yy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();

   

    
    if (hh<10){
        hh = '0' + hh;
    }
    if (min<10){
        min = '0' + min;
    }
    if (sec<10){
        sec = '0' + sec;
    }
    if (dd<10){
        dd = '0'+ dd;
    }   
        $('#currDate').html( monthNames[mm] + " " +dd+", " + yy  );
        $('#currHour').html(hh);
        $('#currMin').html(min);
        $('#currSec').html(sec);

    }, 1000)
    
    var alarmHr =null;
    var alarmMin = null;
    
    var inputDate  = null;
    var alarmYear = null;
    var alarmMonth = null;
    var alarmDay = null;
    var alarmDate = null;
    $("#setAlarm").attr("disabled", "disabled");
    $("#hourPicker").attr("disabled", "disabled");
    $("#minPicker").attr("disabled", "disabled");

    $( "#datepicker" ).change(function() {
        inputDate = $("#datepicker").val();
        $("#hourPicker").removeAttr("disabled");
                
    });
    $("#hourPicker").change(function(){
        alarmHr = $("#hourPicker").val();
        $("#minPicker").removeAttr("disabled");
    });
    $("#minPicker").change(function(){
        alarmMin = $("#minPicker").val();



        var fields  = inputDate.split("-");

        alarmYear=  fields[0];
        alarmMonth= fields[1];
        alarmDay = fields[2];
        
        alarmDate = new Date(monthNames[alarmMonth-1]+ " "+ alarmDay+ ", "+ alarmYear+ 
                                            " "+ alarmHr+":"+alarmMin+":00");
        

        if (alarmDate > new Date().getTime()){
        }else{
            $("#demo").html("set alarm time is in the past");
            $("#tone_selection").attr("disabled", "disabled");
        }
                
    });
 var audio  = null;
   
   
     audio = document.getElementById("audio");
                
     addSourceToAudio(audio, tone_src,"audio/mpeg");
 
 
 

    $("#tone_selection").change(function(){
        $("#setAlarm").removeAttr("disabled");
            
           var tone_ =  loadTone($("#tone_selection").val());
             audio.innerHTML = '';
            //$("body > source:first").remove();
            // console.log($("#audio").has("source").length ? "yes" : "no");
            addSourceToAudio(audio, tone_, "audio/mpeg");
           // console.log($("#audio").firstChild.src);
    })

    var stopped = false;

   

    $('#setAlarm').click(function(){
        // $("#setAlarm").removeAttr("disabled");
            stopped = false;
           // alert(alarmDate.getHours());
            $("#setAlarm").attr("disabled", "disabled");
            $("#datepicker").attr("disabled", "disabled");
            $("#hourPicker").attr("disabled", "disabled");
            $("#minPicker").attr("disabled", "disabled");

            $("#tone_selection").attr("disabled", "disabled");
            
            
            if ($("#stopAlarm").css("display") == "none"){
                $("#stopAlarm").css("display", "block");
                $("#setAlarm").css("display", "none");
            }else{
                $("#stopAlarm").css("display", "none");
            }
            x = setInterval(function(){
                var now = new Date().getTime();
        
                var distance = alarmDate - now;
        
                var remDays = Math.floor(distance/(1000*60*60*24));
                var remHours = Math.floor((distance %(1000*60*60*24))/(1000*60*60));
                var remMins = Math.floor((distance % (1000*60*60))/(1000*60));
                var remSecs = Math.floor((distance%(1000*60))/1000);
        
                if (remDays<10){
                    remDays = '0'+ remDays;
                }
                if (remMins<10){
                    remMins = '0'+ remMins;
                }
                if (remSecs<10){
                    remSecs = '0'+ remSecs;
                }
                if (remHours<10){
                    remHours = '0'+ remHours;
                }

                $("#remDays").html(remDays);
                $("#remHours").html(remHours);
                $("#remMin").html(remMins);
                $("#remSec").html(remSecs);

                if (distance< 0){
                    $("#stopAlarm").removeAttr("disabled");
                    clearInterval(x);
                    $("#remDays").html("No");
                    $("#remHours").html("Alarms");
                    $("#remMin").html("Set");
                    $("#remSec").html("Yet");
                        while (!stopped){
                             audio.play();
                        }

                }
            }, 1000);
        
    })
    $("#stopAlarm").click(function(){
        stopped = true;
        $("#setAlarm").removeAttr("disabled");
        $("#datepicker").removeAttr("disabled");
        $("#stopAlarm").css("display", "none");
        clearInterval(x);
        $("#setAlarm").css("display", "block");
        $("#demo").html("No alarms set");
        $("#datepicker").val("2018-01-01");
        $("#minPicker").val("00");
        $("#hourPicker").val("00");
        
        $("#tone_selection").removeAttr("disabled");
        $("#remDays").html("No");
        $("#remHours").html("Alarms");
        $("#remMin").html("Set");
        $("#remSec").html("Yet");

        audio.pause();
        audio.currentTime = 0;
    })

    $("#test_start").click(function(){
        audio.play();
    });
    $("#test_stop").click(function(){
        audio.pause();
        audio.currentTime = 0;
    });


    function addSourceToAudio(element, src, type) {
        var source = document.createElement('source');
        source.setAttribute("id","source1");
        source.src = src;
        source.type = type;
        source.loop = true;
    
        element.appendChild(source);
    }


        function loadTone(tone_val){
            var tone_
            switch (tone_val){
                case "default":
                    tone_ = "tones/analog-watch-alarm_daniel-simion.wav";
                    break;
                case "apple_tone":
                    tone_ = "tones/apple_ring.mp3";
                    break;
                case "warning_tone":
                    tone_ = "tones/warning.mp3";
                    break;
                case "awesome_morning":
                    tone_  = "tones/awesomemorning_alarm.mp3";
                    break;
                case "best":
                    tone_ = "tones/best_wake_up_sound.mp3";
                    break;    
                case "extreme":
                    tone_ = "tones/extreme_clock_alarm.mp3";
                    break;
                case "fajar":
                    tone_ = "tones/fajar_alarm.mp3";
                    break;    
                case "get":
                    tone_ = "tones/get_ur_a_out_bed.mp3";
                    break;
                case "said":
                    tone_ = "tones/i_said_wake_up.mp3";
                    break;
                case "mom":
                    tone_ = "tones/mom_alert.mp3";
                    break;
                case "morning":
                    tone_ = "tones/morning_alarm.mp3";
                   break;
                case "nice":
                    tone_ = "tones/nice_wake_up_alarm.mp3";
                    break;
                case "russian":
                    tone_ = "tones/russian_electro.mp3";
                    break;
                case "sweet":
                    tone_ = "tones/sweet_sms.mp3";
                    break; 
                case "wake":
                    tone_ = "tones/wake_up.mp3";
                    break;  
                default:
                    tone_ = "tones/alarm.mp3";
                    break;
            }
            return tone_;
        }

});