import streamlit as st
import pandas as pd
import re
import os

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

# Main Streamlit app for feedback form
def feedbackform():
    # Get the file path for the logo
    logo_path = os.path.join("logo", "k.png")
    new_tab_title = 'Feedback Form'
    # Change the tab title
    st.set_page_config(page_title=new_tab_title, page_icon=logo_path, initial_sidebar_state="collapsed")
    # Set page title
    #st.set_page_config(page_title="Feedback Form", initial_sidebar_state="collapsed")

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

    # Title
    st.title("Feedback Form")

    # Step 1: Ask for user's email
    user_email = st.text_input("Please enter your email address", key="user_email")

    # Step 2: Validate email format
    if user_email and not validate_email(user_email):
        st.warning("Please enter a valid email address. Press Enter.")
        return

    # Step 3: Ask for feedback and rating
    user_feedback = st.text_area("Please provide your valuable feedback.", placeholder="What do you like the most? \nSuggest us on how we can improve.", key="user_feedback")
    user_rating = st.slider("Rate the script out of 10", 1,10, 8, key="user_rating")

    # Step 4: Ask for user preference for subscription
    user_preference = st.radio("Elevate your social media game with a suite of tools, including thumbnail customization, seamless editing, captivating captions, and much more. "
                               "\n Your content, your style – effortlessly perfected for a standout presence. "
                               "\nWould you like to Unlock the power of creativity with KontentGPT's upcoming features?", ["Yes", "No"], key="user_preference")

    # Step 5: Submit Button
    if st.button("Submit", key="submit_button"):
        # Step 6: Save responses to CSV file
    # Step 5: Submit Button
        if not user_email or not user_feedback or user_rating == 0 or user_preference is None:
            st.warning("Please fill in all the fields before submitting.")
        else:
            # Step 6: Save responses to CSV file
            save_feedback_to_csv(user_email, user_feedback, user_rating, user_preference)

    hide_streamlit_style = """
                       <style>
                       #MainMenu {visibility: hidden;}
                       footer {visibility: hidden;}
                       </style>
                       """
    st.markdown(hide_streamlit_style, unsafe_allow_html=True)

if __name__ == "__main__":
    feedbackform()
