class CreneauBrut {
    

    constructor(champs) {
        this.uv = champs[0];
        this.type = champs[1];
        this.jour = champs[2];
        this.heure_debut = champs[3];
        this.heure_fin = champs[4];
        this.frequence = champs[5];
        if(champs[6] == "Distanciel" && champs.length > 7) {
            this.salle = champs[7];
            this.mode_ens = champs[6];
        } else if (champs[6] == "Distanciel") {
            this.mode_ens = champs[6];
        } else if (champs.length > 7) {
            this.salle = champs[7];
            this.mode_ens = champs[6];
        } else {
            this.salle = champs[6];
        }
    }

    convertDay() {
        return dico_semaine.semaine.get(this.jour);
    }

    convertHour() {
        let array = this.heure_debut.split(':').concat(this.heure_fin.split(':'));
        let i = 0;
        //console.log(array);
        let array_number = [];
        for(let mot of array) {
            array_number.push(parseInt(mot));
        }
        //console.log(array_number);
        return array_number;
    }

    afficherTitre() {
        return this.uv.concat(' - ',this.type);
    }

    convertFreq() {
        return parseInt(this.frequence,10);
    }
}

class rrule {
    constructor(freq,until,interval) {
        this.freq = freq;
        this.until = until;
        this.interval = interval;
    }
}

class FormDate {
    constructor(uv,aujourdhui) {
        this.form = document.createElement('form');

        this.rubriques = [];
        this.add();

        this.rubriques[0].addTwoChoiceQuestion(ajoutJourRelatif(aujourdhui,uv));
        body[0].append(new_form);
    }

    add() {
        let new_div = new DivForm();
        this.rubriques.push(new_div);
        this.form.append(new_div.div);
    }

}

class DivForm {
    constructor() {
        this.div = document.createElement('div');
        this.div.classList.add("divFormDate");

        this.inputs = [];

    }

    addRadioButton(date, uv) {
        let new_input = new RadioButtonForm("choix_date",date);
        new_input.addTextLabel(uv);
        this.inputs.push(new_input);
        this.div.append(new_input.radio,new_input.label);
    }

    addTwoChoiceQuestion(date,uv) {
        this.addRadioButton(date,uv);
        this.addRadioButton(ajouterJour(date,7),uv);
    }
}

class RadioButtonForm {
    constructor(name,date) {
        this.radio = document.createElement('input');
        this.radio.type ='radio';
        this.radio.name ="choix_date";
        this.date = date;
        this.radio.value = this.date.toString();

        this.label = document.createElement('label');
        this.label.for = this.radio.value;
        
    }

    addTextLabel(uv) {
        this.label.innerHTML = this.radio.value.concat("  ",uv.afficherTitre());
    }
}