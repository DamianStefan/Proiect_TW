# Proiect_TW
Proiect gestionarea bug-urilor
Aplicatie va fi realizata in node.js cu interfata REST pe partea de back-end. Stocarea datelor(tichetele de bug)
se va face peste o bază relațională și accesul la baza se va face prin intermediul unui ORM.

Vor exista 2 tipuri de utilizatori,studenti inregistrati in echipa unui proiect(pot sa adauge proiecte pentru a fi
 monitorizate) si studenti testeri care testeaza proiectele si raporteaza bugg-urile.

Odata ce un bug a fost raportat acesta va primi o eticheta:Todo.Studentii inregistrati in echipa pot sa incerce
rezolvarea oricarui bug schimband eticheta in:In progress.Odata rezolvat bugg-ul va primi eticheta:Done. 
Va exista o functie search care sa caute bugg-urile dupa codul/eticheta lor.

Vor exista urmatoarele functionalitati: -ca student trebuie să pot sa ma conectez la aplicație cu un cont bazat pe o adresă de email.
										-ca student membru în echipa unui proiect (MP) pot să înregistrez un proiect software pentru a fi monitorizat prin aplicație, specificând repository-ul proiectului și echipa de proiect. 		
										-ca student care nu face parte dintr-un proiect înregistrat pot să mă adaug ca tester (TST) la proiect. 
										-ca TST pot înregistra un bug în aplicație. Bug-ul conține o severitate, o prioritate de rezolvare, o descriere și un link la commit-ul la care se referă. 
										-ca MP pot vedea bug-urile înregistrate pentru proiectele din care fac parte. 
										-ca MP îmi pot aloca rezolvarea unui bug. Un singur MP poate să aibă alocată rezolvarea unui bug la un moment dat. 
										-ca MP după rezolvarea unui bug pot adăuga un status al rezolvării cu un link la commit-ul prin care s-a rezolvat. 

Aplicația are și un sistem de permisiuni. Un MP poate adăuga și modifica un proiect, poate actualiza status-ul unui bug. Un TST poate adăuga un bug.
 
