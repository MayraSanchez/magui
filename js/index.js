(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// changed
			this.nivel = this.getNivel();
			if(this.nivel == 1){ var limite=3 }
			if(this.nivel == 2){ var limite=7 }
			if(this.nivel == 3){ var limite=10 }
			var cartas=cards.slice(0,limite)
			this.cardsArray = $.merge(cartas, cartas);
			// fin changed
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
			
     	this.guess = null;
			this.binding();
		},
		
		// changed
		getNivel: function(){
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			for (var i = 0; i < queries.length; i++){
				arg_name = queries[i].split('=')[0]
				arg_value = queries[i].split('=')[1]
				if(arg_name == 'nivel'){
					break
				}
			}
			var nivel = arg_value;
			return nivel;
		},
		
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on('click', function(event) {
				window.location = 'categorias.html?nombre='+Memory.getName()
			});
			
		},
		
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					// _.guess = id_card
					_.info(_.guess);
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},
		
		info: function(id){
			var path = "resources/sounds/animales/";
			var sounds = ["","oso.mp3","gato.mp3","perro.mp3",
			"elefante.mp3","caballo.mp3","cerdo.mp3","rana.mp3",
			"delfin.mp3","cocodrilo.mp3","leon.mp3"
			];
			//alert(id);
			var poc = path+sounds[id];
			//alert(poc);
			// play sound
			var audio = new Audio(poc);
			audio.play();
		},
		
		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				//Changed
				Memory.changeMessage();
				Memory.$game.fadeOut();
			}, 1000);
		},
		
		//change winner message
		changeMessage: function(){
			var nombre = Memory.getName();
			var the_score = Memory.getScore();
			document.getElementsByClassName('winner')[0].textContent = "Felicidades "+ nombre+ " lo lograste en: " +  the_score;
		},
		//changed
		getName: function(){
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			for (var i = 0; i < queries.length; i++){
				arg_name = queries[i].split('=')[0]
				arg_value = queries[i].split('=')[1]
				if(arg_name == 'nombre'){
					break
				}
			}
			var nombre = arg_value;
			return nombre;
		},
		
		//changed get score
		getScore: function(){
			var score = document.getElementById("basicUsage").innerHTML
			return score;
		},
		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
		var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="resources/imgs/pregunta.png"\
				alt="MAGUI" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "oso",
			img: "resources/imgs/animales/bear.jpg",
			id: 1,
		},
		{
			name: "gato",
			img: "resources/imgs/animales/cat.png",
			id: 2
		},
		{
			name: "perro",
			img: "resources/imgs/animales/dog.png",
			id: 3
		},
		{
			name: "elefante",
			img: "resources/imgs/animales/elephant.png",
			id: 4
		},
		{
			name: "caballo",
			img: "resources/imgs/animales/caballo.jpg",
			id: 5
		},
		{
			name: "cerdo",
			img: "resources/imgs/animales/cerdo.png",
			id: 6
		},
		{
			name: "rana",
			img: "resources/imgs/animales/rana.png",
			id: 7
		},
		{
			name: "delfin",
			img: "resources/imgs/animales/delfin.png",
			id: 8
		},
		{
			name: "cocodrilo",
			img: "resources/imgs/animales/cocodrilo.jpg",
			id: 9
		},
		{
			name: "leon",
			img: "resources/imgs/animales/leon.jpg",
			id: 10
		},
	];
	Memory.init(cards);
})();
