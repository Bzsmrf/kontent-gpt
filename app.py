import streamlit as st
import openai
import os
import subprocess
#from feedbackForm import feedbackform

openai.api_key = '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'


def api_call(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,  # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]


def input_script_language(script):
    prompt = f"""Detect the language of the input script and provide language of the script as output.
    Do not provide any explanation. Just provide Language Name.
    Check whether the text is a mixture of two languages, then provide the mixture language name only. For eg: mixture of Hindi and English language is known as Hinglish Language.
    The input script is delimited by triple backticks \
    ```{script}```
    """
    input_language = api_call(prompt=prompt)
    print(input_language)
    return input_language


def translate_output_language(script, input_language):
    # check output lang n input, if they are same then provide script as it is otherwise translate output script into {lang}
    prompt = f"""
    Translate the below input script in {input_language}, Script is delimited by triple backticks \
    ```{script}```
    """
    output_script = api_call(prompt=prompt)
    return output_script


def improve_script(script):
    # Prompt
    prompt = f""" You will be provided an input script and you need to perform the following tasks on the script.
    Preform the following 2 tasks:
        - Understand the Objective / Topic of the input script.
        - Write a perfect, concise script on the same topic. Follow this rule while generating script: Introduction of user should not be in the first line of script. Introduction of user should be in second or later line but not in the first line.

    The input script is delimited by triple backticks \
    ```{script}```

    """
    output = api_call(prompt=prompt)
    return output

    # messages = [{"role": "user", "content": prompt}]
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=messages,
    #     temperature=0,  # this is the degree of randomness of the model's output
    # )
    # return response.choices[0].message["content"]


def generate_hooks(script, lang):
    prompt = f""" You will be provided with a script and you need to perform the following tasks:

        - Provide 10 attention grabbing hook lines according to output script.
        - Suggest 5 Captions, video shooting tips and video editing tips for output script.
        - Your output should be in {lang} language only.

        Script is delimited by triple backticks \
        ```{script}```
        """
    hooks = api_call(prompt=prompt)
    return hooks


# Main Streamlit app
def main():
    # Get the file path for the logo
    logo_path = os.path.join("logo", "k.png")
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
    st.image("logo/brand_logo1.png", caption='Beta', use_column_width=False, output_format='auto', width=200)

    # Title
    st.title("Improve the Quality of your script with your AI Assistant.")

    # Step 1: Text Area for script input
    script_input = st.text_area("Drop Your Script Below", placeholder="Get Human Touch and Human Engaging Script")
    checkbox_state = st.checkbox(
        "Tick me! If you want to Generate Hooks, Captions, Video Shooting tips and Video Editing Tips as per your script.")
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
            input_script_lang = input_script_language(script_input)
            improved_script = improve_script(script_input)

            if input_script_lang == "English":
                st.success("Improved Script:")
                st.write(improved_script)
                st.markdown("<hr>", unsafe_allow_html=True)
                if checkbox_state:
                    # Call the function when the checkbox is ticked
                    st.write("Generating Hooks, Please wait.")
                    result = generate_hooks(improved_script, input_script_lang)
                    st.write(
                        "You can use the below hooks in the first line or in any other line of the script as per your requirement.")
                    st.write(result)
                    st.markdown("<hr>", unsafe_allow_html=True)

            if not input_script_lang == "English":
                output_script = translate_output_language(improved_script, input_script_lang)
                st.success("Improved Script:")
                st.write(output_script)
                st.markdown("<hr>", unsafe_allow_html=True)
                if checkbox_state:
                    # Call the function when the checkbox is ticked
                    st.write("Generating Hooks")
                    result = generate_hooks(output_script, input_script_lang)
                    st.write(
                        "You can use the below hooks in the first line or in any other line of the script as per your requirement.")
                    st.write(result)
                    st.markdown("<hr>", unsafe_allow_html=True)

            # Call feedbackForm.py
            #feedbackform()
            subprocess.Popen(["streamlit", "run", "feedbackForm.py"])

    # Footer Section
    # st.markdown("<hr>", unsafe_allow_html=True)

    # Contact us
    st.markdown(
        """
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
            <p style="margin: 0;"><b>Contact us</b> - <a style="margin: 0;text-decoration: none;" href="mailto:teamalgo.ai@gmail.com">
                teamalgo.ai@gmail.com </a>
                |
                 <a style="margin: 0;text-decoration: none;" href="https://www.linkedin.com/company/algo-ai01/">
                    LinkedIn profile
                </a>
                  </p>
        </div>
        """,
        unsafe_allow_html=True
    )
    # About us
    st.markdown(
        """
        <div style="background-color: #f4f4f4; padding: 2px; text-align: center;">
            <p style="margin: 10;"><b>About</b> -We Provide AI LLMs that help content creators to make perfect content.
                  </p>
        </div>
        """,
        unsafe_allow_html=True
    )
    st.markdown("<hr>", unsafe_allow_html=True)
    st.markdown(
        """
           <div style="background-color: #f4f4f4; padding: 2px; text-align: center;">
               <p style="margin: 10;"> We are continuously working to launch our final product as soon as possible. Our final product will provide end to end soltuions to land a perfect content. Through the utilization of our final product, content creators will experience seamless automation, making their work not only efficient but also effortlessly streamlined. </p>
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
                background-color: #f4f4f4;
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
    st.write("Please use light mode for this application.")

if __name__ == "__main__":
    main()
