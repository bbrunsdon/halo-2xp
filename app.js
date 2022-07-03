import { entryData, entryGuidKey } from './modules/config'
import { formatPage, newPageElements } from "./modules/formatPage";
import { sendVerificationEmail, getPrize } from './modules/useApi'

// Let's get started...
console.warn("App starting...");

function main() {

    // Check if entry GUID exsists
    if (!sessionStorage.getItem(entryGuidKey)) {

        // If no entry GUID found in local storage, error and abort
        throw Error("No entry GUID found in local storage, aborting.");

    } else {

        let userEmail;
        let veriCode;
        const entryGuid = sessionStorage.getItem(entryGuidKey);
        console.log("Found an entry GUID: " + entryGuid);

        // Build the new front-end
        formatPage();

        // Watch for email address submit on enter key or button click
        newPageElements.emailInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                userEmail = e.target.value;
                handleEmail(userEmail);
            }
        });
        newPageElements.emailButton.addEventListener("click", function() {
            userEmail = newPageElements.emailInput.value;
            handleEmail(userEmail);
        });

        // Handle email address input
        function handleEmail(userEmail) {

            // If there's something in the email input element at time of submit
            if (userEmail) {

                // POST email address to API
                console.log("Sending verification email to:");
                console.log(userEmail);
                sendVerificationEmail(userEmail, entryGuid)

                .then(data => {

                    console.log(data);

                    // If API returns success:true
                    if (data.success) {

                        // Hide email errors and send button
                        newPageElements.emailError.style.display = "none";
                        newPageElements.emailButtonGroup.style.display = "none";

                        // Show field to input verification code
                        newPageElements.veriDiv.style.display = "block";

                        // Listen for input in the verification code input element
                        newPageElements.veriDiv.addEventListener("input", handleVeri);

                    } else {

                        // If we do not get a success response, show the error
                        console.warn("Email address error")
                        newPageElements.emailError.style.display = "block";
                        newPageElements.emailError.textContent = (data.errors[0].message) ? data.errors[0].message : "There was an error with the email address";

                    };

                });

            } else {

                // If no email address is entered, show error
                console.warn("No email address entered");
                newPageElements.emailError.style.display = "block";
                newPageElements.emailError.textContent = "Enter an email address you doofus";

            };

        };

        // Handle verification code input
        function handleVeri() {

            veriCode = newPageElements.veriInput.value;

            // If a 6 digit code is entered, proceed to recaptcha
            if (veriCode.length == 6) {

                // Store verification code in local storage
                // chrome.storage.local.set({ xpVeri: veriCode });
                console.log("Verification code accepted: " + veriCode);

                // Show the recaptcha block and prize button
                newPageElements.recaptchaBlock.style.display = "block";
                newPageElements.prizeButtonDiv.style.display = "block";

                // Listen for click on prize button
                newPageElements.prizeButton.addEventListener("click", handlePrize);

            };

        };

        async function handlePrize() {

            // Show error if there's no recaptcha token
            if (!document.querySelector("#g-recaptcha-response").value) {

                // Show recaptcha error on page
                console.warn("No token");
                newPageElements.recaptchaError.style.display = "block";

            } else {

                // Add loading style
                newPageElements.pageFormContainerDiv.style.opacity = "0.3";

                // Hide any recaptcha errors
                newPageElements.recaptchaError.style.display = "none";

                // Build final data to send to API
                let dataToSend = entryData;
                let recaptchaToken = document.querySelector("#g-recaptcha-response");
                dataToSend.contactDetails.email = userEmail;
                dataToSend.recaptchaToken = recaptchaToken.value;
                dataToSend.verificationCode = veriCode;

                try {

                    // Get the prize!
                    getPrize(dataToSend, entryGuid)
                        .then(response => {

                            console.log(response);

                            // Remove loading style and show prize
                            newPageElements.pageFormContainerDiv.style.opacity = "1";

                            // If API call responds with success, show prize
                            if (response.success && response.data.prizes) {

                                showPrizes(response.data.prizes);

                            } else if (response.errors[0].code == "NoMoreEntriesToday") {

                                // Too many codes for this email address!
                                // TODO: add error message on page
                                throw Error("You've reached your limit for this email address");

                            } else {

                                // Error getting prize
                                // TODO: add error message on page
                                throw Error("No prizes to show, check above fetch() response");

                            };

                        });

                } catch (e) {
                    console.error(e);
                };

            };

        };

        function showPrizes(prizes) {

            // Loop through page elements to hide
            const elements = [
                newPageElements.emailDiv,
                newPageElements.emailButton,
                newPageElements.emailButtonGroup,
                newPageElements.veriDiv,
                newPageElements.recaptchaBlock,
                newPageElements.prizeButtonDiv
            ];
            for (const element of elements) {
                element.style.display = "none";
            };

            // Change page heading
            newPageElements.pageHeading.textContent = "You're always a winner in my eyes ;)";

            // Build prize HTML
            for (const prize of prizes) {

                var date = new Date(prize.wonDate);

                let prizeItemHtml =
                    `<div class="lz-campaign-xbox-prize-item">
                        <div class="lz-campaign-xbox-prize-type"><b>Prize:</b> <var>${prize.subTitle}</var></div>
                        <div class="lz-campaign-xbox-prize-date"><b>Date:</b> <var>${date.toLocaleString("en-GB")}</var></div>
                        <div class="lz-campaign-xbox-prize-code"><var>${prize.itemDetail}</var></div>
                        <div class="button-group margin-top" style="grid-template-columns: 1fr;">
                            <div data-type="redeem" class="infx-button">
                                <a href="https://www.halowaypoint.com/sign-in?path=/redeem%3Fcode=${prize.itemDetail}" target="_blank" class="block-link">
                                    <span class="button-text">Redeem</span> <span class="button-icon"></span>
                                </a>
                            </div>
                        </div>
                    </div>`

                newPageElements.pageFormContainerDiv.insertAdjacentHTML("afterbegin", prizeItemHtml);

            };

            // Clear entry GUID
            sessionStorage.clear();

            // Show refresh buton
            newPageElements.refreshButtonDiv.style.display = "block";
            newPageElements.refreshButton.addEventListener("click", function() {
                window.location.reload();
            });

        };

    };

};

main();