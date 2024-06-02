var pics = new Array(10);
pics[0] = "imgs/home/0.png";
pics[1] = "imgs/home/1.png";
pics[2] = "imgs/home/2.png";
pics[3] = "imgs/home/3.png";
pics[4] = "imgs/home/4.png";
pics[5] = "imgs/home/5.png";
pics[6] = "imgs/home/6.png";
pics[7] = "imgs/home/7.png";
pics[8] = "imgs/home/8.png";
pics[9] = "imgs/home/9.png";

//Array for labels
var labels = new Array(10);
labels[0] = "Weights";
labels[1] = "Balance-Living Lifestyle Change";
labels[2] = "Elliptical Trainer";
labels[3] = "Download our App from the App Store";
labels[4] = "Our Weight Room";
labels[5] = "Read our Health Blogs!";
labels[6] = "Meet our Trainers!";
labels[7] = "Our Wide Assortment of Free-Weights";
labels[8] = "Enjoy our Outdoor Yoga Class!";
labels[9] = "Balance-Living is Healthy Living!";

var c = 0;
var timer = 0;


function cyclePics() {
    //Set pic
    document.getElementById("slideshow").src = pics[c];

    //Set labels
    document.getElementById("slide_caption").innerHTML = labels[c];


    c += 1;

    //Reset 
    if (c % 10 == 0)
        c = 0;

    //Set time out
    timer = setTimeout("cyclePics()", 3000);
}
