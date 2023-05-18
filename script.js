const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

const toggleButton = () => {
    button.disabled = !button.disabled;
};

// Passing Jokes to VoiceRSS
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: "01adf527c9a34e17a7373f5031fd1cdd",
        src: joke,
        hl: "en-us",
        v: "John",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
    console.log(joke);
};

// Get Jokes from Joke API
const getJokes = async () => {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log("Haiyaaah!", error);
    }
};

// Joke Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
