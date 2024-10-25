import os
import csv

# Change to the correct directory
os.chdir('C:/Users/huzii/Documents/Coding projects/serenity_ai/server-calls')

# Initialize a set to store unique tags
tags = set()

# Open the output file to save the results
with open('output.txt', 'w') as output_file:
    with open('affirmations.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header

        for row in reader:
            # Strip any leading or trailing whitespace from both fields
            affirmation = row[0].strip()
            tag = row[1].strip()

            # Add the tag to the set
            tags.add(tag)

            # Write the formatted output to the text file with a comma
            output_file.write(f"('{affirmation}','{tag}'),\n")

# Print the set of tags at the end
print("\nUnique Tags:", tags)

# Inform that the output has been saved
print("Affirmations have been saved to 'output.txt'.")
