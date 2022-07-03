// Clean up existing page and add new front-end elements
export let newPageElements = {};

export function formatPage() {

    console.log("Removing unnecessary page elements...");

    // List of CSS classes to hide
    const classesToHide = [
        "input-extra",
        "marketing-preferences",
        "lz-campaign-xbox-age-check",
        "lz-campaign-xbox-terms-and-conditions",
        "button-group",
        "input-label",
        "g-recaptcha",
        "infx-validation-result",
        "infx-error-message"
    ];

    // List of HTML tags to hide
    const tagsToHide = [
        "small",
        "input",
        "select"
    ];

    // Iterate through lists and apply display:none to each HTML element
    for (const cssClass of classesToHide) {

        elements = document.getElementsByClassName(cssClass);

        for (const element of elements) {
            element.style.display = "none";
        }

    };
    for (const htmlTag of tagsToHide) {

        elements = document.getElementsByTagName(htmlTag);

        for (const element of elements) {
            element.style.display = "none";
        }
    }

    console.log("Injecting new HTML into page...");

    // Change the heading text
    const pageHeading = document.getElementsByTagName("h4")[0];
    pageHeading.textContent = "Let's make this a bit smoother...";

    // Select the containers we want to inject new HTML into
    const pageFormContainerDiv = document.getElementsByClassName("infx-form-shell")[0];
    const pageRecaptchaContainerDiv = document.getElementsByClassName("g-recaptcha")[0];

    // Email address input element and send button
    const emailInputHtml =
        `<div id="emailDivId" class="margin-top">
            <i class="input-extra">The verifiction code is sent here</i>
            <p class="input-label">
                <b>Email address *</b>
            </p>
            <input id="emailInputId" type="text" name="email" autocapitalize="off" placeholder="Enter email address here" class="textbox">
            <span id="emailErrorId" class="infx-validation-result infx-error-message" style="display:none;"></span>
        </div>`;

    const emailButtonHtml =
        `<div id="emailButtonGroupId" class="button-group" style="margin: 0 auto;">
            <div id="emailButtonId" class="infx-button" style="background-color: #000; border: 1.5px solid #6DDCF2;">
                <button type="button" class="block-link">
                    <span class="button-text" style="color: #6DDCF2;">Verify Email</span>
                    <span class="button-icon"></span>
                </button>
            </div>
        </div>`;

    // Verification code input element
    const veriInputHtml =
        `<div id="veriDivId" class="margin-top" style="display:none;">
            <p class="input-label">
                <b>Verification code *</b>
            </p>
            <input id="veriInputId" type="text" name="verificationCode" pattern="^[0-9]*$" placeholder="Enter verification code here" maxlength="6" class="textbox"">
        </div>`;

    // Recaptcha error message
    const recaptchaErrorHtml =
        `<span id="recaptchaErrorId" class="infx-validation-result infx-error-message" style="display:none;">Complete this pain in the arse first</span>`;

    // Prize button!
    const prizeButtonHtml =
        `<div id=prizeButtonDivId class="button-group" style="margin: 0 auto; display:none;">
            <div id="prizeButtonId" class="infx-button" style="background-color: #000; border: 1.5px solid #9bf00b;">
                <button type="button" class="block-link">
                    <span class="button-text" style="color: #9bf00b;">Get your prize!</span>
                    <span class="button-icon"></span>
                </button>
            </div>
        </div>`;

    // Prize button!
    const refreshButtonHtml =
        `<div id=refreshButtonDivId class="button-group" style="margin: 0 auto; display:none;">
            <div id="refreshButtonId" class="infx-button" style="background-color: #000; border: 1.5px solid #6DDCF2;">
                <button type="button" class="block-link">
                    <span class="button-text" style="color: #6DDCF2;">Refresh to win again!</span>
                    <span class="button-icon"></span>
                </button>
            </div>
        </div>`;

    // Inject HTML into the containers
    pageFormContainerDiv.insertAdjacentHTML("afterbegin", emailInputHtml + emailButtonHtml + veriInputHtml);
    pageFormContainerDiv.insertAdjacentHTML("beforeend", prizeButtonHtml + refreshButtonHtml);
    pageRecaptchaContainerDiv.insertAdjacentHTML("afterend", recaptchaErrorHtml);

    // Add new page elements to exported object
    newPageElements.pageHeading = pageHeading;
    newPageElements.pageFormContainerDiv = pageFormContainerDiv;

    // Email elements
    newPageElements.emailDiv = document.querySelector("#emailDivId");
    newPageElements.emailInput = document.querySelector("#emailInputId");
    newPageElements.emailButton = document.querySelector("#emailButtonId");
    newPageElements.emailButtonGroup = document.querySelector("#emailButtonGroupId");
    newPageElements.emailError = document.querySelector("#emailErrorId");

    // Verification code elements
    newPageElements.veriDiv = document.querySelector("#veriDivId");
    newPageElements.veriInput = document.querySelector("#veriInputId");

    // Prize button elements
    newPageElements.prizeButton = document.querySelector("#prizeButtonId");
    newPageElements.prizeButtonDiv = document.querySelector("#prizeButtonDivId");

    // Refresh button elements
    newPageElements.refreshButton = document.querySelector("#refreshButtonId");
    newPageElements.refreshButtonDiv = document.querySelector("#refreshButtonDivId");

    // Recaptcha elements
    newPageElements.recaptchaBlock = document.getElementsByClassName("g-recaptcha")[0];
    newPageElements.recaptchaError = document.querySelector("#recaptchaErrorId");

};