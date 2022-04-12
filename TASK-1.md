# Zadanie 1

## Materiały pomocniczne (Pre-Work)
- [Dobra praktyka opisująca w jaki sposób podchodzić do wytwarzania interfejsu użytkownika](https://www.componentdriven.org/)
- [Dokumentacja Material UI React opisująca proces stylowania](https://mui.com/customization/how-to-customize/)
- [Dokładny dokument opisujący to w jaki sposób postępować z obrazami w Responsive Web](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/)
- Nie zapominaj o dokumentacji React, a także społeczności na Circle.so

---
## Design

[Design zadania jest dostępny tutaj.](https://www.figma.com/file/QkPgOAUtwNWa9d0q0Gsztg/Designs?node-id=417%3A5570)

## Treść zadania
Twoje dzisiejsze zadanie będzie polegało na stworzeniu i ostylowaniu kilku małych prezentacyjnych komponentów, które będą wykorzystywane w wielu miejscach aplikacji. Tego rodzaju komponenty bardzo często określa się jako Atomy - możesz dowiedzieć się dlaczego zapoznając się z [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), terminologią opracowaną przez Brada Frosta.

Stworzysz i ostylujesz dziś 4 komponenty - Przycisk, komponent ładowania, błędu oraz braku danych. Pomoże Ci w tym narzędzie storybook w którym będziesz widzieć efekty swojej pracy.

### Button (Przycisk)

#### Założenia
Przycisk który dziś stworzysz powinien być oparty o komponent Button z [bliblioteki MUI](https://mui.com/components/buttons/).
W aplikacji w katalogu `client/src/ui/` znajduje się plik `Button.jsx`. Możesz zmieniać jego implementacje, nie powininen być jednak przenoszony w inne miejsce.

#### Wymagania
Button powinien minimalnie akceptować następujące propsy, zauważ że są one takie same jak w MUI: 
- variant - `contained`, `outlined`
- color - `primary`, `error`, `success`, `warning`
- disabled - `true`, `false`

oraz używać ich do wyrenderowywania różnych wersji komponentu jak na załączonym designie.

Button powinien także reagować na następujące pseudo classy:
- hover
- active


### No Content

#### Założenia
Ten komponent w kolejncyh zadaniach będzie wykorzystywany gdy zapytanie na serwer się powiedzie lecz nie zostaną zwrócone dane.
W aplikacji w katalogu `client/src/ui/` znajduje się plik `NoContent.jsx`. Możesz zmieniać jego implementacje, nie powininen być jednak przenoszony w inne miejsce.
Na designie możesz zobaczyć obrazek który jest używany przez ten komponent. Jest on już dostępny w kodzie aplikacji pod ścieżką `client/src/assets/no_content.png`

#### Wymagania
Stwórz komponent, który będzie wyświetlał “Brak danych do wyświetlenia” oraz będzie wyśrodkowany horyzontalnie.

### Error

#### Założenia
Ten komponent w kolejncyh zadaniach będzie wykorzystywany gdy zapytanie na serwer się powiedzie lecz nie zostaną zwrócone dane.
W aplikacji w katalogu `client/src/ui/` znajduje się plik `Error.jsx`. Możesz zmieniać jego implementacje, nie powininen być jednak przenoszony w inne miejsce.
Na designie możesz zobaczyć obrazek który jest używany przez ten komponent. Jest on już dostępny w kodzie aplikacji pod ścieżką `client/src/assets/unknown_error.png`

#### Wymagania
Stwórz komponent, który będzie wyświetlał “Wystąpił nieoczekiwany błąd” oraz będzie wyśrodkowany horyzontalnie.

---
### Zwróć uwagę na

Zwróć uwagę na to w jaki sposób MUI pozwala ci konfigurować i stylować komponenty.
Jest wiele opcji z których możesz skorzystać. Wybór należy do Ciebie :) 

---
### Kryteria Akceptacji
W oparciu o te wymagania były stworzone testy, które akceptują Twoje rozwiązanie.
Upewnij się, że wszystkie kryteria się spełnione, poprzez testy manualne oraz komendę `cypress:run` lub `cypress:open` jeśli chcesz widzieć co jest wykonywane podczas testu.

Design wymagany do ukończenia zadania jest dostępny pod tym linkiem.

`<Button />` (Przycisk)

- W stanie `hover` powinien zmieniać wygląd zgodnie z designem
- W stanie `active` powinien zmieniać wygląd zgodnie z designem
- Jeśli ma propsa disabled akcja onClick nie powinna być wywoływana, a button powinien być wyszarzony

`<Error />` (Komponent stanu błędu)

- Powinien być wyśrodkowany względem swojego rodzica
- Powinien wyświetlać tekst: “Wystąpił nieoczekiwany błąd”
- Powinien wyświetlać ikonę jak na designie

`<NoContent />` (Komponent braku danych)

- Powinien być wyśrodkowany względem swojego rodzica
- Powinien zawierać “Brak danych do wyświetlenia”
- Powinien wyświetlać grafikę  jak na designie
