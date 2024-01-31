import streamlit as st
import os
import re
import pandas as pd
from streamlit_option_menu import option_menu
import streamlit_analytics

import textwrap

import google.generativeai as genai

from IPython.display import Markdown


def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


genai.configure(api_key="AIzaSyCJS35k9OVgwBgsQ0s5x9V_hEO0jZX_I78")


def api_call(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response


def input_script_language(script):
    prompt = f"""Detect the language of the input script and provide language of the script as output.
    Do not provide any explanation. Just provide Language Name.
    Check whether the text is a mixture of two languages, then provide the mixture language name only. For eg: mixture of Hindi and English language is known as Hinglish Language.
    The input script is delimited by triple backticks \
    {script}
    """
    input_language = api_call(prompt=prompt)
    return input_language


def translate_output_language(script, input_language):
    # check output lang n input, if they are same then provide script as it is otherwise translate output script into {lang}
    prompt = f"""
    Translate the below input script in {input_language}, Script is delimited by triple backticks \
    {script}
    """
    output_script = api_call(prompt=prompt)
    return output_script


def improve_script(script):
    # Prompt
    prompt = f"""Revamp the script to captivate the audience more effectively.
    Original Script: {script}
    Craft an enhanced version in the same language as the original.
    The improved script should convey more information using concise language.
    """
    #
    # prompt = f"""Revamp the script to captivate the audience more effectively.
    # Original Script: {script}
    # Hooks: {hooks}
    # Craft an enhanced version in the same language as the original.
    # The improved script should convey more information using concise language.
    # Try to use above hooks and strategically incorporate them at the beginning, between sections, and at the end of the script as needed.
    # """

    output = api_call(prompt=prompt)
    return output


def generate_hooks(script):
    prompt = f""" You will be provided with a script and you need to perform the following tasks:

        - Provide 10 attention grabbing hook lines and 5 Captions according to output script.
        - Suggest on how to create thumbnail according to output script.
        - Suggest on how to shoot video according to output script.
        - Suggest on how to edit video according to output script.
        - Detect the language of the provided input script which is delimited by triple backticks. Provide output script in the same language as of the given input script language.

        Script is delimited by triple backticks \
        {script}
        """
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text
    # hooks = api_call(prompt=prompt)
    # return hooks


# Function to validate email format
def validate_email(email):
    # Use a simple regex pattern for basic email format validation
    pattern = r'^\S+@\S+\.\S+$'
    return bool(re.match(pattern, email))


# Function to save user feedback to CSV file
def save_feedback_to_csv(user_email, user_feedback, user_rating, user_preference):
    data = {
        "User Email": [user_email],
        "User Feedback": [user_feedback],
        "User Rating": [user_rating],
        "Subscription Preference": [user_preference],
    }

    df = pd.DataFrame(data)
    #
    # Append to existing CSV file or create a new one
    try:
        existing_data = pd.read_csv("user_feedback.csv")
        df = pd.concat([existing_data, df], ignore_index=True)
    except FileNotFoundError:
        pass  # File does not exist yet

    df.to_csv("user_feedback.csv", index=False)

    st.success("Feedback saved successfully.")


def feedbackform():
    # Get the file path for the logo
    logo_path = os.path.join("logo", "k.png")
    new_tab_title = 'Feedback Form'
    # Change the tab title
    st.set_page_config(page_title=new_tab_title, page_icon=logo_path, initial_sidebar_state="collapsed")

    # Set background color to black and text color to white
    st.markdown(
        """
        <style>
        body {
            background-color: black;
            color: white;
        }
        </style>
        """,
        unsafe_allow_html=True
    )


# Main Streamlit app
def main():
    # Get the file path for the logo
    logo_path = os.path.join("logo", "k.svg")
    new_tab_title = 'KontentGPT'
    # Change the tab title
    st.set_page_config(page_title=new_tab_title, page_icon=logo_path, layout="wide")

    logo_style = """
           <style>
               .styled-logo {
                   object-fit: contain
                   mix-blend-mode: color-burn;
                   }
           </style>
       """

    # Display the styled logo
    st.markdown(logo_style, unsafe_allow_html=True)
    st.image("logo/brand_logo2.svg", caption='Beta [Experiment]', use_column_width=False, output_format='auto',
             width=200)
    # tracker
    with streamlit_analytics.track():
        selected = option_menu(
            menu_title=None,  # required
            options=["Home", "How to Use", "Feedback", "Contact", "About", "Bonus"],  # required
            icons=["house", "camera-reels", "balloon-heart", "envelope", "people", "award"],  # optional
            menu_icon="cast",  # optional
            default_index=0,  # optional
            orientation="horizontal",
        )

        if selected == "Home":
            # Title
            st.title("Improve the quality of your script with the help of your AI assistant.")

            # Step 1: Text Area for script input
            script_input = st.text_area("Drop Your Script Below",
                                        placeholder="Get Human Touch and Human Engaging Script")
            checkbox_state = st.checkbox("Check the box for personalized tips on generating hooks, captions, thumbnails, video shooting, and editing according to your script.")
            button_style = """
                    <style>
                        button {
                      position: relative;
                      margin: 0;
                      padding: 0.8em 1em;
                      outline: none;
                      text-decoration: none;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      cursor: pointer;
                      border: none;
                      text-transform: uppercase;
                      background-color: #333;
                      border-radius: 10px;
                      color: #fff;
                      font-weight: 300;
                      font-size: 18px;
                      font-family: inherit;
                      z-index: 0;
                      overflow: hidden;
                      transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
                    }

                    button:hover {
                      animation: sh0 0.5s ease-in-out both;
                    }

                    @keyframes sh0 {
                      0% {
                        transform: rotate(0deg) translate3d(0, 0, 0);
                      }

                      25% {
                        transform: rotate(7deg) translate3d(0, 0, 0);
                      }

                      50% {
                        transform: rotate(-7deg) translate3d(0, 0, 0);
                      }

                      75% {
                        transform: rotate(1deg) translate3d(0, 0, 0);
                      }

                      100% {
                        transform: rotate(0deg) translate3d(0, 0, 0);
                      }
                    }

                    button:hover span {
                      animation: storm 0.7s ease-in-out both;
                      animation-delay: 0.06s;
                    }

                    button::before,
                    button::after {
                      content: '';
                      position: absolute;
                      right: 0;
                      bottom: 0;
                      width: 100px;
                      height: 100px;
                      border-radius: 50%;
                      background: #fff;
                      opacity: 0;
                      transition: transform 0.15s cubic-bezier(0.02, 0.01, 0.47, 1), opacity 0.15s cubic-bezier(0.02, 0.01, 0.47, 1);
                      z-index: -1;
                      transform: translate(100%, -25%) translate3d(0, 0, 0);
                    }

                    button:hover::before,
                    button:hover::after {
                      opacity: 0.15;
                      transition: transform 0.2s cubic-bezier(0.02, 0.01, 0.47, 1), opacity 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
                    }

                    button:hover::before {
                      transform: translate3d(50%, 0, 0) scale(0.9);
                    }

                    button:hover::after {
                      transform: translate(50%, 0) scale(1.1);
                    }
                </style>

                        """

            st.markdown(button_style, unsafe_allow_html=True)

            # Step 2: Submit Button
            if st.button("Submit", key="submit_button"):
                # Step 3: Perform tasks on submit
                if not script_input:
                    st.warning("Please enter a script before submitting.")
                else:
                    st.text("Please wait, Great results take time to appear.")

                    # Step 3.1: Improve the script
                    # improved_script = improve_script(script_input,script_type, script_language)
                    # input_script_lang = input_script_language(script_input)
                    improved_script = improve_script(script_input)
                    # st.write(improved_script)
                    for chunk in improved_script:
                        output_script = chunk.text
                        st.write(chunk.text)
                    if checkbox_state:
                        # Call the function when the checkbox is ticked
                        st.success("Generating Hooks...")
                        result = generate_hooks(output_script)
                        st.write(
                            "You can use the below hooks in the first line or in any other line of the script as per your requirements.")
                        st.write(result)
                        # for chunk in result:
                        #    st.write(chunk.text)

                    # if input_script_lang == "English":
                    #     st.success("Improved Script:")
                    #     for chunk in improved_script:
                    #         st.write(chunk.text)
                    #     st.markdown("<hr>", unsafe_allow_html=True)
                    #     if checkbox_state:
                    #         # Call the function when the checkbox is ticked
                    #         st.success("Generating Hooks...")
                    #         result = generate_hooks(improved_script, input_script_lang)
                    #         st.write(
                    #             "You can use the below hooks in the first line or in any other line of the script as per your requirement.")
                    #         #st.write(result)
                    #         for chunk in result:
                    #             st.write(chunk.text)
                    #         st.markdown("<hr>", unsafe_allow_html=True)
                    #
                    # if not input_script_lang == "English":
                    #     output_script = translate_output_language(improved_script, input_script_lang)
                    #     st.success("Improved Script:")
                    #     #st.write(output_script)
                    #     for chunk in output_script:
                    #         st.write(chunk.text)
                    #     st.markdown("<hr>", unsafe_allow_html=True)
                    #     if checkbox_state:
                    #         # Call the function when the checkbox is ticked
                    #         st.success("Generating Hooks...")
                    #         result = generate_hooks(output_script, input_script_lang)
                    #         st.write(
                    #             "You can use the below hooks in the first line or in any other line of the script as per your requirement.")
                    #         #st.write(result)
                    #         for chunk in result:
                    #             st.write(chunk.text)
                    #         st.markdown("<hr>", unsafe_allow_html=True)
            st.write("Please note that switching tabs will refresh your page. You may lose your current state/data.")

        if selected == "How to Use":
            # Replace 'your_video_path' with the actual path to your video file
            video_path = 'video/tutorial.mp4'

            # Display the video
            st.video(video_path, format="video/mp4", start_time=0)

        if selected == "Feedback":
            # Title
            st.title("Feedback Form")

            # Step 1: Ask for user's email
            user_email = st.text_input("Please enter your email address", key="user_email")

            # Step 2: Validate email format
            if user_email and not validate_email(user_email):
                st.warning("Please enter a valid email address. Press Enter.")
                return

            # Step 3: Ask for feedback and rating
            user_feedback = st.text_area("Please provide your valuable feedback.",
                                         placeholder="What do you like the most? \nSuggest how we can improve.",
                                         key="user_feedback")
            user_rating = st.slider("Rate the script out of 10", 1, 10, 8, key="user_rating")

            # Step 4: Ask for user preference for subscription
            user_preference = st.radio(
                "Automate your content creation process, starting from text generation and extending to video production. "
                "\n Your content, your style – effortlessly perfected for a standout presence. "
                "\nWould you like to Unlock the power of creativity with KontentGPT's upcoming features?",
                ["Yes", "No"],
                key="user_preference")

            # Step 5: Submit Button
            if st.button("Submit", key="submit_button"):
                # Step 6: Save responses to CSV file
                # Step 5: Submit Button
                if not user_email or not user_feedback or user_rating == 0 or user_preference is None:
                    st.warning("Please fill in all the fields before submitting.")
                else:
                    # Step 6: Save responses to CSV file
                    save_feedback_to_csv(user_email, user_feedback, user_rating, user_preference)
            st.write("Please note that switching tabs will refresh your page. You may lose your current state/data.")

        if selected == "Contact":
            # Contact us
            st.markdown(
                """
                <div style="background-color: #0E1117; padding: 10px; text-align: center;">
                    <p style="margin: 0;"><b>Contact us</b> - <a style="margin: 0;text-decoration: none;" href="mailto:hello@kontentgpt.com">
                        hello@kontentgpt.com </a>
                        |
                         <a style="margin: 0;text-decoration: none;" href="https://www.linkedin.com/company/algo-ai01/">
                            LinkedIn profile
                        </a>
                          </p>
                </div>
                """,
                unsafe_allow_html=True
            )

        if selected == "About":
            # About us
            st.markdown(
                """
                <div style="background-color: #0E1117; padding: 2px; text-align: center;">
                    <p style="margin: 10;"><b></b>We provide AI LLMs that help content creators to create perfect content.
                          </p>
                </div>
                """,
                unsafe_allow_html=True
            )
            st.markdown("<hr>", unsafe_allow_html=True)
            st.markdown(
                """
                   <div style="background-color: #0E1117; padding: 2px; text-align: center;">
                       <p style="margin: 10;"> We are constantly striving to launch our final product as soon as possible. Our upcoming product will offer end-to-end solutions to create perfect content. With our final product, content creators will enjoy seamless automation, making their work not only efficient but also effortlessly streamlined. </p>
                   </div>
                   """,
                unsafe_allow_html=True
            )

        if selected == "Bonus":
            tip = "test"
            st.markdown(
                """
                <div style="background-color: #0E1117; padding: 2px; text-align: center;">
                    <p style="margin: 10;"><b>Tip of the day is : </b>Follow the 120% Rule to seamlessly connect your first and last lines, creating an endless and seamless video.
                          </p><br>
                          <b>For example</b>: "Iss women ne is saal gautam adani aaur mukesh ambani se bhi jyada paise kamaye hai.<br>
                          ...<br>
                          ...<br>
                          aaur iski vajah se aaj savitri jindal, india ki richest woman hai, jinki net worth 25.3 billion dollars ki hai. Isi tarah"
                          <br><br>
                          In the above example, last line is connected to the first line and user will rewatch your video without realising they are rewatching your video.

                </div>
                """,
                unsafe_allow_html=True
            )

    # Footer

    st.markdown(
        """
        <style>
            .footerCopyright {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: #0E1117;
                padding: 0px;
                text-align: center;
            }
        </style>
        <div class="footerCopyright">
            <p>Copyright © 2023-2024 KontentGPT. All rights reserved.</p>
        </div>
        """,
        unsafe_allow_html=True
    )
    st.markdown("""
            <style>
                   .block-container {
                        padding-top: 2rem;
                        padding-bottom: 0rem;
                        padding-left: 5rem;
                        padding-right: 5rem;
                    }
            </style>
            """, unsafe_allow_html=True)

    hide_streamlit_style = """
                        <style>
                        #MainMenu {visibility: hidden;}
                        footer {visibility: hidden;}
                        </style>
                        """
    st.markdown(hide_streamlit_style, unsafe_allow_html=True)


if __name__ == "__main__":
    main()