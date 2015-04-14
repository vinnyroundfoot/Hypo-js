/**
* Librairie : Hypo
* Description : Répertoire de fonctions de mathématiques financières, spécialement orientée vers les emprunts et placements
* Version : 1.0
* Auteur : VinnyRoundfoot
* GitHub : https://github.com/vinnyroundfoot/Hypo-js
* Date : mars 2015
* 
*/
(function (alias) {

    var Hypo = {},
        root = this,
        alias1;
        
    Hypo.VERSION = '1.0';
    Hypo.AUTHOR = 'VinnyRoundfoot';

    if (typeof alias === "string" && alias.length > 0) {
        alias1 = alias;
    } else {
        alias1 = 'Hypo';
    }

//code récupéré de underscore.js
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Hypo;
        }
        exports[alias1] = Hypo;
    } else {
        root[alias1] = Hypo;
    }
//-----------------------------------

    /**
     * Calcul de l'arrondi d'un nombre
     * @param {number} m nombre à arrondir
     * @param {number} dec nombre de décimales dans le résultat
     * @return {float} nombre arrondi
    */
    var arrondi = Hypo.arrondi = function arrondi(m, dec) {
        var montantArrondi = m;
        if (typeof dec !== "undefined" && parseInt(dec, 10) === dec) {
            var r = Math.pow(10, dec);
            montantArrondi = Math.round(m * r) / r;
        }
        return montantArrondi;
    };
    
    /**
     * Conversion d'une variable en nombre (si possible)
     * @param p variable à convertir en nombre
     * @return {float} nombre
    */    
    Hypo.convStrNum = function convStrNum(p) {
        if (typeof p === 'number') {
            return p;
        }
        if(typeof p ==='string')
        {
            var c = p.replace(',' , '.').replace(' ' , '');

            if (!isNaN(c)) {
                return parseFloat(c);
            } 
        }
        return NaN;       
    };    
    

    /**
     * Conversion d'un taux périodique vers une autre période
     * @param {float} taux taux à convertir
     * @param {number} pOri période de départ (1:annuel, 2:semestriel, 4:trimestriel, 12:mensuel)
     * @param {number} pDest période de "destination" (1:annuel, 2:semestriel, 4:trimestriel, 12:mensuel)
     * @param {number} dec nombre de décimales à appliquer au résultat;
     * @return {float} nombre arronditaux converti
    */
    Hypo.convTx = function convTx(taux, pOri, pDest, dec) {
        
        taux  = this.convStrNum(taux);
        pOri  = this.convStrNum(pOri);
        pDest = this.convStrNum(pDest);
        dec   = this.convStrNum(dec);
        
        if (taux === 0) {
            return 0;
        }
        
        if (pOri === pDest) {
            return taux;
        }
        var tx = Math.pow(1 + taux, pOri / pDest) - 1;
        return arrondi(tx, dec);
    };

    /**
     * Calcul de la valeur acquise d'un capital K placé pendant n périodes
     * à un taux t (intérêts composés)
     *
     *   Kn = K0 * (1 + t)^n
     *
     * @param {number} K0 capital de départ
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} valeur acquise
    */
    Hypo.VC_K = Hypo.valeurAcquise = function VC_K(K0, n, t, dec) {
        
        if (t === 0 || n === 0) {
            return K0;
        }
        
        var K = K0 * Math.pow(1 + t, n);
        return arrondi(K, dec);
    };

    /**
     * Calcul de la valeur acquise d'une suite de placements pendant n périodes
     * à un taux t (intérêts composés)
     *
     *               (1 +t )^n -1
     *   Kn = m *  -----------------
     *                      t
     *
     * @param {float} m mensualité
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} valeur acquise
    */
    Hypo.VC = function VC(m, n, t, dec) {
        
        if (n === 0) {
            return m;
        }
        
        if (t===0) {
            return arrondi(m * n, dec);
        }
        var Kn = m * (Math.pow(1 + t, n) - 1) / t;
        return arrondi(Kn, dec);
    };

    /**
     * CalCul de la valeur actuelle d'un capital Kn dont la valeur actuelle a été placée
     * pendant n périodes à un taux t
     *
     *            kn
     *   K0 = ------------
     *         (1 + t)^n
     *
     * @param {number} Kn capital acquis
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} valeur actuelle
    */
    Hypo.VA_K = Hypo.valeurActuelle =  function K0(Kn, n, t, dec) {
        
        if (n === 0) {
            return Kn;
        }
        
        if (t === 0) {
            return Kn;
        }
        
        var Kzero = Kn / Math.pow(1 + t, n);
        return arrondi(Kzero, dec);
    };

    /**
     * CalCul de la valeur actuelle d'une suite de placements pendant n périodes
     * à un taux t
     *
     *              1 - (1 + t)^-n
     *   K0 =  m * ----------------
     *                   i
     *
     * @param {float} m mensualité
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} valeur actuelle
    */
    Hypo.VA = function VA(m, n, t, dec) {
        
        m  = this.convStrNum(m);
        n  = this.convStrNum(n);
        t  = this.convStrNum(t);
        dec   = this.convStrNum(dec); 
        
        if (t === 0) {
            return arrondi(m * n, 2);
        }
        
        var Kzero = m * (1 - Math.pow(1 + t, -n)) / t;
        return arrondi(Kzero, dec);
    };

    /**
     * CalCul du taux en fonction du capital de départ (K0), du capital acquis (Kn)
     * et du nombre de période (n)
     *
     *            Kn
     *   r =  ----------
     *            K0
     *
     *   t =  r^(1/n) - 1
     *
     * @param {number} K0 capital de départ
     * @param {number} Kn capital acquis
     * @param {number} n  nombre de périodes
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} taux
    */
    Hypo.taux_Kn = function taux_Kn(K0, Kn, n, dec) {
        var r = Kn / K0,
            tx = Math.pow(r, 1 / n) - 1;
        return arrondi(tx, dec);
    };

    /**
     * Approximation du taux en fonction du capital de départ K0,
     * de la mensualité m et de la durée n
     * possibilité d'ajouter des frais pour calculer le TAEG
     * n pérodes à un taux t
     * méthode employée : newton
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} m mensualité
     * @param {float} f montant des frais éventuels
     * @return {float} taux
    */

    Hypo.taux = function taux(K0, n, m, f) {
        /* détermination par la méthode de NEWTON
           qui dit en gros :

           x - P(x) / P'(x)    P'(x) étant la dérivée de P(x)
           il faut alors "itérer x" pour obtenir le moment ou différence aboutit à 0

           Dans le cas de nos prêt, çà donne :

           P(t) = K0/M * t * (1 + t)^n - (1 + t)^n + 1 = 0

           et

           P'(t) = K0/M * (1+t)^n + K0/M * n * t * (1 + t)^(n-1) - n * (1+t)^(n-1)

           et

           t1 = tO - P(t0)/P'(t0)

           on va donc fixer une valeur de départ à t0 et recalculer succivement tx2 = tx1 - P(t1)/P'(t1)
           jusqu'au moment où le résultat ne va plus évoluer
        */
       
        m  = this.convStrNum(m);
        n  = this.convStrNum(n);
        K0 = this.convStrNum(K0);
        f  = this.convStrNum(f);
       
        if (!(typeof f !== "undefined" && parseInt(f, 10) === f)) {
            f = 0;
        }

        var M = (K0 - f) / m,
            r0 = 0.01,
            r1 = 0.01,
            stopinc = 0;

        do {
            stopinc++;
            r0 = r1;
            var p = M * r0 * Math.pow(1 + r0, n) - Math.pow(1 + r0, n) + 1;
            var dp = M * Math.pow(1 + r0, n) + M * n * r0 * Math.pow(1 + r0, n - 1) - n * Math.pow(1 + r0, n - 1);
            r1 = arrondi(r0 - p / dp, 9);
        } while (r0 !== r1 && stopinc < 20);

        if (stopinc === 20) {
            return -1;
        }
        return r1;
    };

    /**
     * CalCul de la durée d'un placement en fonction du capital de départ,
     * du capital acquis et du taux
     *
     *            Kn
     *   r =  ----------
     *            K0
     *
     *           log(r)
     *   t =  ------------
     *           log(1+t)
     *
     * @param {number} K0 capital de départ
     * @param {number} Kn capital acquis
     * @param {number} t  taux appliqué
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {object}
    */
    Hypo.duree_Kn = function duree_Kn(K0, Kn, t) {
        
        K0  = this.convStrNum(K0);
        Kn  = this.convStrNum(Kn);
        t   = this.convStrNum(t);   
        dec  = this.convStrNum(dec);
        
        if (K0 === 0 || t === 0 || K0 === Kn) {
            return 0;
        }
        
        var r = Kn / K0;
        var duree = Math.log(r) / Math.log(1 + t);
        
        return duree;
    };

    /**
     * CalCul de la durée d'un placement en fonction du capital à obtenir,
     * de la mensualité et du taux
     *
     *
     *           
     *          log(m) - log(m - KO * t)
     *   n =  -----------------------------
     *                  log(1+t)
     *
     * @param {number} K0 capital emprunté
     * @param {number} m mensualité
     * @param {number} t  taux appliqué
     * @return {number}
    */
    Hypo.duree = function duree(K0, m, t) {
        K0  = this.convStrNum(K0);
        m   = this.convStrNum(m); 
        t   = this.convStrNum(t);   
        
        if (t === 0 ) {
            return arrondi(K0 / m, 2);
        }
        
        return (Math.log(m) - Math.log(m - K0 * t)) / Math.log( 1 +t);
    };

    /**
     * Calcul de la mensualité d'un emprunt K0 souscrit pour n périodes
     * à un taux t
     * n pérodes à un taux t
     *
     *             K0 * t
     *   m = ------------------
     *          1 - (1 + t)^-n
     *
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} mensualité
    */
    Hypo.mensualite = Hypo.VPM = function VPM(K0, n, t, dec) {
        K0  = this.convStrNum(K0);
        n  = this.convStrNum(n);
        t = this.convStrNum(t);
        dec   = this.convStrNum(dec);
        
        if (n === 0) {
            return 0;
        }
        
        if (t === 0) {
            return arrondi(K0 / n, dec);
        }
        return arrondi(K0 * t / (1 - Math.pow(1 + t, -n)), dec);
    };


    /**
     * Calcul de la mensualité d'un placement pendant n périodes
     * à un taux t en fonction de la valeur acquise souhaitée
     * n pérodes à un taux t
     *
     *                   t
     *   m = Kn * ----------------
     *               (1 +t)^n -1
     *
     * @param {number} Kn capital acquis
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} mensualité
    */
    Hypo.mensualite_Kn = Hypo.VPM_Kn = function VPM_Kn(Kn, n, t, dec) {
        
        if (t === 0) {
            return arrondi(Kn / n, 2);
        }
        
        return arrondi(Kn * t / ((Math.pow(1 + t, n) - 1)), dec);
    };

    /**
     * Pour un emprunt remboursé en n périodes à un taux t et présentant n_amd périodes d'amortissement différé,  
     * détermination de la mensualité (m_amd) appliquée pendant la période d'amortissement différé et la mensualité (m)
     * appliquée pendant la durée restante du prêt
     * 
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} n_mad nombre de périodes d'amortissement différé
     * @return {array} objet représentant la mensualité pendant l'AMD (m_amd), la mensualité (m) pendant la durée de prêt restante et le total des intérêts (cumulInt) pendant la période d'AMD
     */    
    Hypo.VPM_amd = function VPM_amd(K0, n, t, n_amd, dec) {
        var m_amd = arrondi( K0 * t, 2),
            intp = m_amd * n_amd,
            m = this.VPM(K0, n - n_amd, t, dec);
            return {'m_amd' : m_amd, 'm' : m, 'cumulInt' : intp };
        return m_amd;
    };


    /**
     * Calcul de l'amortissement (A) de 1ere période
     * d'un emprunt K0 souscrit pour n périodes à un taux t
     *
     *           K0 * t
     *   A = -------------
     *        (1 +t)^n -1
     *
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} amortissement de la 1ere période
    */
    Hypo.princPer1 = Hypo.amortissementP1 = function amortissementP1(K0, n, t, dec) {
        
        if (n === 0) {
            return K0;
        }
        
        if (t === 0) {
            return this.VPM(K0, n, t, dec);
        }        
        
        var A = (K0 * t) / (Math.pow(1 + t, n) - 1);
        return arrondi(A, dec);
    };

    /**
     * Calcul de l'amortissement (Apn) de la période p
     * d'un emprunt K0 souscrit pour n périodes à un taux t
     *
     *   A = amortissementP1
     *
     *  Apn =  (1 + t)^(p-1) x A
     *
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p période de calcul de l'amortissement
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} amortissement de la période p
     */
    Hypo.princPer = Hypo.amortissementPn = function amortissementPn(K0, n, t, p, dec) {
        
        K0  = this.convStrNum(K0);
        n   = this.convStrNum(n);
        t   = this.convStrNum(t);
        p   = this.convStrNum(p);
        dec = this.convStrNum(dec);        
            
            
        var A = this.princPer1(K0, n, t, dec);
        if (p===1 || t===0) {
           return arrondi(A, dec); 
        }else{
            var Apn = Math.pow(1 + t, p - 1) * A;
            return arrondi(Apn, dec);
        }
    };

    /**
     * Calcul de l'amortissement (Apn2) de la période p
     * d'un emprunt souscrit pour n périodes à un taux t
     * en fonction de l'amortissement d'un période donné (apn1)
     *
     *  Apn2 =  Apn1 * (1 + t)^(k-p)
     *
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} apn1 montant de l'amortissement à la période p1
     * @param {number} p1 période de l'amortissement donné
     * @param {number} p2 période de calcul de l'amortissement
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} amortissement de la période p2
     */
    Hypo.princPerP = Hypo.amortissementPnp = function amortissementPnp(n, t, apn1, p1, p2, dec) {
        
        if (t === 0) {
            return apn1;
        }
        
        var apn2 = apn1 * Math.pow(1 + t, p2 - p1);
        return arrondi(apn2, dec);
    };

    /**
     * Calcul des amortissements cumulés de la période p1
     * à la période p2 d'un emprunt souscrit pour n périodes à un taux t
  
     * @param {number} K0  capital de départ 
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p1 période de début 
     * @param {number} p2 période de fin
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} amortissements cumulés de la période p1 à p2
     */
    Hypo.cumulPrinc = function cumulPrinc(K0, n, t, p1, p2, dec) {
        
        K0  = this.convStrNum(K0);
        n   = this.convStrNum(n);
        t   = this.convStrNum(t);
        p1   = this.convStrNum(p1);
        p2   = this.convStrNum(p2);        
        dec = this.convStrNum(dec);  
        
        var pp1 = p1,
            pp2 = p2,
            sump = 0,
            m = this.mensualite(K0, n, t, dec);

        while (pp1 <= pp2) {
            sump = sump + this.amortissementPn(K0, n, t, pp1);
            pp1++;
        }
        return arrondi(sump,dec);
    };

    /**
     * Calcul de l'intérêt (ipn) de la période p
     * d'un emprunt K0 souscrit pour n périodes à un taux t
     * n pérodes à un taux t
     *
     *   ap = amortissement à la période p
     *
     *  ipn  = m - ap
     *
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p période de calcul de l'amortissement
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} intérêts de la période p
     */
    Hypo.intPer = Hypo.interetsPn = function interetsPn(K0, n, t, p, dec) {
        
        K0  = this.convStrNum(K0);
        n   = this.convStrNum(n);
        t   = this.convStrNum(t);
        p   = this.convStrNum(p);
        dec = this.convStrNum(dec);  
        
        var m = this.mensualite(K0, n, t, dec);
        var apn = this.amortissementPn(K0, n, t, p, dec);
        return arrondi(m - apn, dec);
    };

    Hypo.cumulInt = function cumulInt(K0, n, t, p1, p2, dec) {
        
        if (t === 0) {
            return 0;
        }
        
        var ip1 = p1,
            ip2 = p2,
            sumi = 0,
            m = this.mensualite(K0, n, t, dec);

        while (ip1 <= ip2) {
            sumi = sumi + (m - this.amortissementPn(K0, n, t, ip1));
            ip1++;
        }
        return arrondi(sumi,dec);
    };

    Hypo.intTotaux = function intTotaux(K0, m, n, dec) {
        
        if (K0 === 0 || m === 0 || n === 0) {
            return 0;
        }
        
        return arrondi((m * n) - K0, dec);
    };

    /**
     * Calcul du solde restant dû à la période p d'un emprunt K0 souscrit pour n périodes
     * à un taux t
     * n pérodes à un taux t
     *
     *                   1 - (1+t)^(-(n-p))
     *   Kpn =  m * -------------------------
     *                           t
     *
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p période pour laquelle on veut déterminer le solde restant dû
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} montant du solde restant dû à la période p
     */
    Hypo.SRDPn_K =  function SRDPn_K(K0, n, t, p, dec) {
        var m = this.mensualite(K0, n, t);
        var kpn = m * (1 - Math.pow(1 + t, -(n - p))) / t;
        return arrondi(kpn, dec);
    };

    /**
     * Calcul du solde restant dû à la période p d'un emprunt remboursé en n
     * période d'un montant m à un taux t
     *
     *                   1 - (1+t)^(-(n-p))
     *   Kpn =  m * -------------------------
     *                           t
     *
     * @param {number} m montant remboursé pendant la période
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p période pour laquelle on veut déterminer le solde restant dû
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} montant du solde restant dû à la période p
     */
    Hypo.SRDPn = function SRDPn(m, n, t, p, dec) {
        var kpn = m * (1 - Math.pow(1 + t, -(n - p))) / t;
        return arrondi(kpn, dec);
    };

    /**
     * Calcul du capital remboursé à la période p d'un emprunt K0 souscrit pour n périodes
     * à un taux t
     * n pérodes à un taux t
     *
     *                   (1+t)^p - 1
     *   Kr =  A * ----------------------
     *                        t
     *
     *   A = amortissement de la période 1
     *
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p période pour laquelle on veut déterminer le solde restant dû
     * @param {number} dec nombre de décimales dans le résultat (optionnel)
     * @return {float} montant de l'emprunt déjà remboursé à la période p
    */
    Hypo.capRmb_K =  function capRmb_K(K0, n, t, p, dec) {

        var A = Hypo.amortissementP1(K0, n, t);
        var Kr = A * ((Math.pow(1 + t, p) - 1) / t);

        return arrondi(Kr, dec);
    };
    
    
    /**
     * Détermination du tableau d'amortissement pour un emprunt de K0 pour une durée n 
     * à un taux t
     * 
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} p1 période de début de calcul du tableau d'amortissement
     * @param {number} p2 période de fin de calcul du tableau d'amortissement
     * @return {array} objets représentant chaque ligne du tableau d'amortissement
     */
    Hypo.tableauAmort = function tableauAmort(K0, n, t, p1, p2) {
        
        if (typeof p1 === "undefined" || parseInt(p1, 10) !== p1)  {
            p1 = 1;
        }
        
        if (typeof p2 === "undefined" || parseInt(p2, 10) === p1)  {
            p2 = n;
        }        
        
        var i = p1-1,
            mens = this.VPM(K0, n, t, 2),
            srd = ( i===0 ? K0 : this.SRDPn (mens, n, t, i)),        
            tableau = [
                    {   'K0' : K0,
                        'n'  : n,
                        't'  : t,
                        'm'  : mens,
                        'p1' : p1,
                        'p2' : p2
                    }
                ];
        
        while (srd > 0 && i <p2)
        {
           i = i + 1;
           var ligne = {};
           ligne.periode = i;
           ligne.solde_dep = srd;
           ligne.interet = srd * t;
           ligne.amort = arrondi(mens - ligne.interet, 2);
           ligne.srd = arrondi(ligne.solde_dep - ligne.amort, 2);
           srd = ligne.srd;
           tableau.push(ligne);
        }
        
        return tableau;
    };

    /**
     * Détermination du tableau d'amortissement pour un emprunt de K0 pour une durée n 
     * à un taux t avec un amortissement différé de n_amd périodes
     * 
     * @param {number} K0 capital emprunté
     * @param {number} n  nombre de périodes
     * @param {float} t taux d'intérêt pour la période
     * @param {number} n_amd nombre de périodes d'amortissements différés
     * @param {number} p1 période de début de calcul du tableau d'amortissement
     * @param {number} p2 période de fin de calcul du tableau d'amortissement
     * @return {array} objets représentant chaque ligne du tableau d'amortissement
     */
    Hypo.tableauAmort_amd = function tableauAmort_amd(K0, n, t, n_amd, p1, p2) {
        
        if (typeof p1 === "undefined" || parseInt(p1, 10) !== p1)  {
            p1 = 1;
        }
        
        if (typeof p2 === "undefined" || parseInt(p2, 10) !== p2)  {
            p2 = n;
        }        

         if (typeof n_amd === "undefined" || parseInt(n_amd, 10) !== n_amd)  {
            n_amd = 0;
        }             
        
        if (n_amd === 0) {
            return this.tableauAmort(K0, n, t, n_amd);
        }
        
        var amd = this.VPM_amd(K0, n, t, n_amd, 2),
            i = 0,
            mens = amd.m_amd;
            srd = ( i===0 ? K0 : this.SRDPn (mens, n, t, i)),        
            tableau = [
                    {   'K0' : K0,
                        'n'  : n,
                        't'  : t,
                        'm_amd'  : mens,
                        'p1' : p1,
                        'p2' : p2
                    }
                ];
        
        while (i< n_amd)
        {
           i = i + 1;
           var ligne = {};
           ligne.periode = i;
           ligne.solde_dep = K0;
           ligne.interet = arrondi(K0 * t,2);
           ligne.amort = 0;
           ligne.srd = K0;
           tableau.push(ligne);
        }
        
        srd = K0;
        mens = this.VPM(srd, n - n_amd, t, 2);
        tableau[0].m = mens;

        while (srd > 0 && i < n)
        {
           i = i + 1;
           var ligne = {};
           ligne.periode = i;
           ligne.solde_dep = srd;
           ligne.interet = arrondi(srd * t, 2);
           ligne.amort = arrondi(mens - ligne.interet, 2);
           ligne.srd = arrondi(ligne.solde_dep - ligne.amort, 2);
           srd = ligne.srd;
           tableau.push(ligne);
        }       
        
        var t = [];
        t.push(tableau[0]);
        return t.concat(tableau.slice(p1, p2+1));
    };

// ------------------------------------------

    Hypo.calcTAEG = function calcTAEG(K0, n, t, f) {
        var mens = this.mensualite(K0, n, t, 2),
            min = arrondi(t, 6),
            max = 1,
            tst = (min + max) / 2;

        var val_polyn = function (p_test) {
            return mens * (1 - Math.pow(1 + p_test, -n)) / p_test - K0 + f;
        };

        if (f === 0) {
            return this.convTx(t, 12, 1, 4);
        }

        var f_min = val_polyn(min);
        if (f_min * val_polyn(max) > 0) {
            return -1;
        }

        while (max - min > 1 / 10000000) {
            var f_tst = val_polyn(tst);
            if (f_min * f_tst < 0) {
                max = tst;
            } else {
                min = tst;
                f_min = f_tst;
            }
            tst = (min + max) / 2;
        }
        return this.convTx(tst, 12, 1, 4);
    };

    Hypo.calcTAEGMens = function calcTAEGMens(K0, n, m, f) {
        var mens = m,
            min = 0.000001,
            max = 1,
            tst = (min + max) / 2;

        var val_polyn = function (p_test) {
            return mens * (1 - Math.pow(1 + p_test, -n)) / p_test - K0 + f;
        };

        var f_min = val_polyn(min);
        if (f_min * val_polyn(max) > 0) {
            return -1;
        }

        while (max - min > 1 / 10000000) {
            var f_tst = val_polyn(tst);
            if (f_min * f_tst < 0) {
                max = tst;
            } else {
                min = tst;
                f_min = f_tst;
            }
            tst = (min + max) / 2;
        }
        return this.convTx(tst, 12, 1, 4);
    };

// ------------------------------------------
    var periodes = {
            "Ann" : 1,
            "Sem" : 2,
            "Trim" : 4,
            "Mens" : 12
        };

    for (var j in periodes)
    {
        for(var i in periodes) {
          if(i!==j) {
              Hypo['tx' + j + i] =
              function(ori,dest) {
                  var r= function(taux, dec) {
                    return Hypo.convTx(taux, ori, dest, dec);
                  };
                  return r;
              }(periodes[j], periodes[i]);
          }
        }
    }
    
    //ajouté le bout de code suivant pour que Hypo puisse être utilisé directement comme un module par require.js
    if ("function" == typeof define && define.amd && define("hypo", [], function() {
        return Hypo;
    }));

})();
