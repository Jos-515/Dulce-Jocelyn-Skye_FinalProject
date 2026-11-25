# Dulce-Jocelyn-Skye_FinalProject

## What is the creative motivation / intended use of your project.

The creative motivation behind our Digital Aquarium was to explore how natural-looking ecosystems can emerge from simple programmed behaviours. By combining generative art and autonomous agents, the project aimed to recreate the movement, patterns and visuals of an underwater aquarium-type environment through code. That included adding behaviours such as flocking, seeking food and responding to the currents in the background to allow the environment to develop organically, producing unpredictable patterns and interactions. We also used the project as an opportunity to experiment with many of the different coding concepts learnt in class and display them in a clear demonstrative way, including autonomous agents, Perlin noise & sine waves. The intended audience is anyone interested in interactive digital art, generative systems or the natural world. We envisioned the aquarium as a calming, digital experience that invites viewers to observe the small interactions taking place within it. Much like watching a real aquarium, the audience should be able to appreciate the movement, visual harmony of the ecosystem without necessarily needing to interact with it directly. Additionallu we wanted the aquarium to have a whimsical and fantasy feel, so rather than using real fish and plants, we scanned in origiami fish made out of book pages and chose a art nouveau inspired colour palette for the underwater garden. 


## Describe how you implemented the project.

We decided to use different techniques that we learn during the course and use them for a specific element in our project. 
For the algae and crabs decoration we implemented W4-randomness and noise, for the water background we used W5- Randomness and noise, lastly for the fish we decided to use W6- Autonomous agents. 

## How successful was your project in meeting your creative aims.

Our biggest strength was effectively combined three different weeks focuses into one outcome. This gave us the freedom to work seperatly with our own creative styles and coombine them together collaboratively. The most difficult challenge was combining our individual scripts into one fullly functioning one. Each script tried to run the background through a rendering loop, simply put together meant only one would show. Therefore each script had to be render layer by layer. The Perlin Noise waves became bgGraphics, and the underwater garden was rendered on top, with the fish being a layer above that. As that is the layer the users need to interact with directly and it ensured all layers could be seen clearly.  Furthermore we decided it would be good if the layers interacted with each other, so the fish naturally move along the currents created through the Perlin Noise Flow Field.Initially we thought it would be interesting to demonstrate a day and night cycle, changing how the fish behave based on their species behavioural patterns. Some acting more engergetically if they are nocturnal. However we weren't able to implement this due to the time constraints of the project.

## Credit any third-party resources (e.g. code, data) you used and state which aspects of the project are your own work.

Week 4, Week 5 and Week 6 starter codes were used as the base for our code. 

Research Materials:

https://www.red3d.com/cwr/boids/ 

Origami Fish Tutorial: https://www.thecraftaholicwitch.com/origami-koi-fish/?srsltid=AYCX9vK07zspNC77h3DioXDEjEtoM-Hpv1ZHfTjPRKBDy0lr8FVuYxiE
Origami Fish Paper Material: https://olddesignshop.com/2012/11/free-vintage-graphic-full-page-of-english-text/ 

## Provide instructions for compiling and running your project.

Download the project into your code editor of choice. We used visual studio code with the live server extension. To run it through that, go to the index.html page and click the globe icon on the top right. Once the project is running, simply click anywhere within the aquarium and a food particle will appear. You can click whenever and wherever you want and the fish will move towards it. 


