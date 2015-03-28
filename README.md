**Hypo.js**
======

**Hypo.js** est une librairie Javascript reprenant un ensemble de fonctions financières utilisées dans le cadre de prêt hypothécaire ou à tempérament

Installation
------------
Dans une page HTML, simplement ajouter le script :

||| <script src="hypo.js"></script>


Fonctions présentes dans la librairie :
-------------

#### Valeur acquise, valeur actuelle

**Hypo.VC_K** : calcul de la valeur acquise d'un placement **K0**  pendant **n** périodes à un taux **t**.
 
    //exemple
    
    var K0 = 10000, // capital placé
    n = 5,      // nombre d'années
    t = .05,    // taux annuel (5%)
    dec =2;     // nombre de décimales dans le résultat

    var res = Hypo.VC_K(K0, n, t, dec); // 12762.82 


**Hypo.VC** : calcul de la valeur acquise d'une suite de placements **m** constants pendant **n** périodes à un taux **t**.

    //exemple
    
    var m = 200, // versement périodique
    n = 60,      // nombre de mois
    t = .002870, // taux mensuel (3.5% en annuel)
    dec =2;      // nombre de décimales dans le résultat

    var res = Hypo.VC(m, n, t, dec); // 13074.73 

**Hypo.VA_K** : calcul de la valeur actuelle d'un capital acquis (valeur acquise) **Kn** dont la valeur actuelle a été placée pendant **n** périodes à un taux **t**
  
    //exemple
    
    var Kn = 12762.82, // capital acquis
    n = 5,      // nombre d'années
    t = .05,    // taux annuel 
    dec =2;     // nombre de décimales dans le résultat

    var res = Hypo.VA_K(Kn, n, t, dec); // 10000 

**Hypo.VA** : calcul de la valeur actuelle d'une suite de placements **m** constants pendant **n** périodes à un taux **t**

    //exemple
    
    var m = 200, // versement périodique
    n = 60,      // nombre de mois
    t = .002870, // taux mensuel (3.5% en annuel)
    dec =2;      // nombre de décimales dans le résultat

    var res = Hypo.VA(m, n, t, dec); // 11009.17 


#### Mensualité, taux et durée d'un emprunt

**Hypo.VPM** : calcul de la mensualité d'un emprunt **K0** souscrit pour **n** périodes à un taux **t**.

    //exemple
    
    var K0 = 100000, // capital emprunté
    n = 240,         // nombre de mois
    t = .004074,    // taux mensuel (5% en annuel)
    dec =2;         // nombre de décimales dans le résultat

    var res = Hypo.VPM(K0, n, t, dec); // 653.83

**Hypo.VPM_amd** : Pour un emprunt remboursé en **n** périodes à un taux **t** et présentant **n_amd** périodes d'amortissement différé,  détermination de la mensualité (**m_amd**) appliquée pendant la période d'amortissement différé et la mensualité (**m**) appliquée pendant la durée restante du prêt.

    //exemple
        
    var K0 = 100000, // capital emprunté
        n = 240,  // nombre de mois
        t = .004074, // taux mensuel (5% en annuel)
        dec =2;  // nombre de décimales dans le résultat 
    
    var res = Hypo.VPM_amd(K0, n, t, 36, dec); // {m_amd: 407.4, m: 722.73, cumulInt: 14666.4}  

**Hypo.taux** : approximation du taux d'un emprunt **K0** en fonction de sa mensualité **m**, de sa durée **n** et d'éventuels frais **f** à intégrer dans le taux.

    //exemple
    
    var K0 = 100000, // capital emprunté
    m = 653.83,      // mensualité
    n = 240;         // durée en mois

    var res = Hypo.taux(K0, n, m); // 0.004074224 (taux mensuel)

**Hypo.duree** : calcul de la durée d'un emprunt en fonction du capital emprunté **K0**, de la mensualité **m** remboursée périodiquement et du taux **t**.

    //exemple
    
    var K0 = 100000, // capital emprunté
    m = 653.83,      // mensualité
    n = .004074;     // taux mensuel (5% en annuel)

    var res = Hypo.duree(K0, m, t); // 239.9989437255888 (+/- 240 mois)

#### Mensualité, taux et durée d'un placement

**Hypo.VPM_Kn** : calcul du montant des versements (constants) en fonction de la valeur acquise **Kn** souhaitée, du taux **t** et du nombre de périodes de placement **n**.

    //exemple
    
    var Kn = 1300, // valeur acquise souhaitée
    n = 24,          // nombre de mois de placement
    t = .002870,     // taux mensuel (3.5% en annuel)
    dec = 2;

    var res = Hypo.VPM_Kn(Kn, n, t); // 52.4

**Hypo.taux_Kn** : détermination du taux d'un placement en fonction du capital de départ **K0**, du capital acquis **Kn** et du nombre de périodes **n**.

    //exemple
    
    var Kn = 1300, // valeur acquise  souhaitée
    K0 = 1000      // valeur de départ
    n = 24,        // nombre de période de placement
    dec = 5;

    var res = Hypo.taux_Kn(K0, Kn, n, dec) // 0.01099 (taux mensuel)

**Hypo.duree_Kn** : calcul de la durée d'un placement en fonction du capital de départ **K0**, du capital acquis **Kn** et du taux **t**.

    //exemple
        
    var Kn = 1300, // valeur acquise  souhaitée
        K0 = 1000      // valeur de départ
        t = .01099;    // taux mensuel
        
    var res = Hypo.duree_Kn(K0, Kn, t);

#### Amortissements et intérêts d'un emprunt

**Hypo.princPer1** : calcul du montant de l'amortissement de la 1ere période d'un emprunt **K0** souscrit pendant **n** périodes à un taux **t**.

    //exemple
    
    var K0 = 100000, // capital emprunté
        n = 240,         // nombre de mois
        t = .004074,    // taux mensuel (5% en annuel)
        dec = 2;        // nombre de décimales dans le résultat

    var res = Hypo.princPer1(K0, n, t, dec); // 246.43

**Hypo.princPer** : calcul de l'amortissement de la période **p** d'un emprunt **K0** souscrit pour **n** périodes à un taux **t**

    //exemple
    
    var K0 = 100000, // capital emprunté
        n = 240,     // nombre de mois
        t = .004074, // taux mensuel (5% en annuel)
        p = 12,      // période de calcul
        dec = 2;     // nombre de décimales dans le résultat

    var res = Hypo.princPer(K0, n, t, p, dec); // 257.7

**Hypo.princPerP** : calcul de l'amortissement d'une période **p2** d'un emprunt en fonction de l'amortissement donné **apn** d'une autre période **p1**.

    //exemple
    
    var n = 240,     // nombre de mois
        t = .004074, // taux mensuel (5% en annuel)
        apn1 = 257.7
        p1 = 12,     // période de référence
        p2 = 24,     // période de calcul
        dec =2;      // nombre de décimales dans le résultat
    
    var res = Hypo.princPerP(n, t, apn1, p1, p2, dec); // 270.58

**Hypo.cumulPrinc** : calcul de l'amortissement cumulé de la période **p1** à la période **p2** d'un emprunt **K0** d'une durée **n** à un taux **t**.

    //exemple
    
    var K0 = 100000  // capital emprunté
        n = 240,     // nombre de mois
        t = .004074, // taux mensuel (5% en annuel)
        p1 = 1,      // période de début
        p2 = 12,     // période de fin
        dec =2;      // nombre de décimales dans le résultat
    
    var res = Hypo.cumulPrinc(K0, n, t, p1, p2, dec); // 3024.31

**Hypo.intPer** : calcul du montant de l'intérêt payé pour une période donnée **p** pour un capital emprunté **K0** pendant **n** à un taux **t**.

    //exemple
    
    var K0 = 100000, // capital emprunté
        n = 240,     // nombre de mois
        t = .004074, // taux mensuel (5% en annuel)
        p = 12,      // période de calcul
        dec = 2;     // nombre de décimales dans le résultat
    
    var res = Hypo.intPer(K0, n, t, p, dec); // 396.13

**Hypo.cumulInt** : calcul de l'intérêt cumulé de la période **p1** à la période **p2** d'un emprunt **K0** d'une durée **n** à un taux **t**.

    //exemple
    
    var K0 = 100000  // capital emprunté
        n = 240,     // nombre de mois
        t = .004074, // taux mensuel (5% en annuel)
        p1 = 1,      // période de début
        p2 = 12,     // période de fin
        dec =2;      // nombre de décimales dans le résultat
    
    var res = Hypo.cumulInt(K0, n, t, p1, p2, dec); // 4821.65

**Hypo.intTotaux** : Calcul des intérêts totaux pour un emprunt **K0** de **n** mensualités **m**.

    //exemple
    
    var K0 = 100000  // capital emprunté
        m = 602.24,  // mensualité 
        n = 240,     // nombre de mois
        dec =2;      // nombre de décimales dans le résultat
    
    var res = Hypo.intTotaux(K0, m, n, dec); // 44537.6

#### Solde restant dû et capital remboursé
**Hypo.SRDPn_K** : calcul du solde restant dû à la fin de la période **p** pour un emprunt **K0** remboursé en **n** périodes au taux **t**.

    //exemple
    
    var K0 = 100000  // capital emprunté
        n = 240,     // nombre de mois
        t = .003274, // taux mensuel
        p = 12,       // période de calcul
        dec =2;      // nombre de décimales dans le résultat
    
    var res = Hypo.SRDPn_K(K0, n, t, p, dec); // 96641.94

**Hypo.SRDPn** : calcul du solde restant dû à la période **p** d'un emprunt remboursé en **n** (périodes) mensualités **m** à un taux **t**.

**Hypo.capRmb_K** : calcul du capital total déjà remboursé à la période **p** d'un emprunt **K0** remboursé en **p** période à un taux **t**.

    //exemple
    
    var K0 = 100000  // capital emprunté
        n = 240,     // nombre de mois
        t = .003274, // taux mensuel
        p = 12,       // période de calcul
        dec =2;      // nombre de décimales dans le résultat
    
    var res = Hypo.capRmb_K(K0, n, t, p, dec); // 3358.06

#### Tableau d'amortissement

**Hypo.tableauAmort** : établissement du tableau d'amortissement de la période **p1** à la période **p2** d'un emprunt **K0** remboursé en **n** périodes à un taux **t**.

**Hypo.tableauAmort_amd** : établissement du tableau d'amortissement de la période **p1** à la période **p2** d'un emprunt **K0** remboursé en **n** périodes à un taux **t** présentant un amortissement différé de **n_amd** périodes.
 
#### Fonctions "Helper"

**Hypo.arrondi** : arrondi à **dec** décimales d'un nombre **m**

    //exemple
        
    var m = 123.4567,
        res = Hypo.arrondi(m, 2); //123.46

**Hypo.convTx** : conversion d'un taux **t** exprimé en un type de période **pOri** (ex. annuel) vers un taux exprimé en un autre type de période **pDest** (ex.  mensuel). Les valeurs pour pOri et pDest peuvent être : 1 - annuel, 2 - semestriel, 4 - trimestriel, 12 - mensuel)

    //exemple
    var t = .04, // taux 4% annuel
        pOri = 1, // taux exprimé en annuel
        pDest = 12, // onversionen taux mensuel
        dec = 6; //nombre de décimales dans le résultat    
    
    var res = Hypo.convTx(t, pOri, pDest, dec); //0.003274
