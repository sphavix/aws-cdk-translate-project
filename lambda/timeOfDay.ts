import * as clientTrtanslate from '@aws-sdk/client-translate';
import * as lambda from 'aws-lambda';

const translateClient = new clientTrtanslate.TranslateClient({});

export const index: lambda.APIGatewayProxyHandlerV2 = async function(event:
    lambda.APIGatewayProxyEventV2) {
    try{
        
        if(!event.body){
            throw new Error("No body in event");
        }

        const eventBody = JSON.parse(event.body);
        const { sourceLang, targetLang, text} = eventBody;

        const now = new Date(Date.now()).toString();
        console.log(now);

        const tranlateCmd = new clientTrtanslate.TranslateTextCommand({
            SourceLanguageCode: sourceLang,
            TargetLanguageCode: targetLang,
            Text: text,
        });

        const result = await translateClient.send(tranlateCmd);
        console.log(result);

        const response = {
            timestamp: now,
            text: result.TranslatedText
        };

        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    }
    catch(e: any){
        console.error(e);
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
}