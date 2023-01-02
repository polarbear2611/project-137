status="";
input="";
objects=[];
synth=window.speechSynthesis;
function preload()
{

}

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video,0,0,480,380);
}

function start()
{
    objectdetector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innnerHTML = "Detecting objects";
    input=document.getElementById("input").value;
}

function modelloaded()
{
    console.log("model loaded");
    status=true;
}


function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw()
{
    image(video,0,0,480,380);
    if(status  != "")
    {
        objectdetector.detect(video,gotResults);
        for(i=0; i < objects.length; i++)
        {
            fill("red");
            stroke("red");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "  %",objects[i].x+15,objects[i].y+15);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == input)
            {
                video.stop();
                objectdetector.detect(gotResults);
                document.getElementById("status").innerHTML="object found"
                document.getElementById("status_objectfound").innerHTML = " " + input + " found"; 
                var uttterThis= new SpeechSynthesisUtterance("the object mentioned is found");
                synth.speak(uttterThis);
            }
            else
            {
                document.getElementById("status").innerHTML="object not found"
                document.getElementById("status_objectfound").innerHTML = " " +input + " not found"; 
            }
        }
    }
    }
