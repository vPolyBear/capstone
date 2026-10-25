import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#099197',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
    gap: 10,
  },
  button: {
    backgroundColor: '#b71f57',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#112f2c',
      padding: 12,
      borderRadius: 8,
  },
  radio: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#96d1aa',
      width: '90%',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
  },
  radioText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: 'normal',
      paddingRight: 15,
  },
  radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      marginRight: 10,
      borderColor: '#b71f57',
      alignItems: 'center',
      justifyContent: 'center',
  },
  radioCircleSelected: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#b71f57',
  },
  prompts: {
      width: '90%',
      gap: 10,
  },
  promptText: {
      color: '#ffffff',
      fontSize: 16,
      backgroundColor: '#112f2c',
      padding: 12,
      borderRadius: 8,
      fontWeight: 'bold',
  },
  generateButton: {
      width: '90%',
      alignItems: 'center',
      backgroundColor: '#b71f57',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ffffff',
  },
  generateButtonDisabled: {
      opacity: 0.6,
  },
  generateButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  result: {
      width: '90%',
      color: '#000000',
      backgroundColor: '#96d1aa',
      padding: 12,
      borderRadius: 8,
      fontSize: 18,
  },
  error: {
      width: '90%',
      color: '#ffffff',
      backgroundColor: '#8b1e3f',
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 'bold',
      fontStyle: 'italic',
  },
  header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
      paddingBottom: 3,
      paddingTop: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      textAlign:'center'
  },
  pickerOutside: {
      width: '65%', 
      backgroundColor: '#96d1aa', 
      borderRadius: 25,
      overflow: 'hidden',
      marginVertical: 5,
  },
  line: {
    height: 5,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    width: '85%',
    justifyContent: 'center',
    alignContent: 'center'
  },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000',
      textAlign:'left',
      backgroundColor: '#FFFFFF',
      height: 250,
      width: 300,
      borderRadius: 25,
      padding: 15

  },


})

